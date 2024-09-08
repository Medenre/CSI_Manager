import pygame
import random
import math

# Initialisation
pygame.init()
width, height = 800, 600
screen = pygame.display.set_mode((width, height))
clock = pygame.time.Clock()

# Paramètres de la carte
map_size = 50
tile_width = 64
tile_height = 32

# Génération de la carte
def generate_map(size):
    return [[random.randint(0, 3) for _ in range(size)] for _ in range(size)]

# Conversion des coordonnées cartésiennes en isométriques
def cart_to_iso(x, y):
    iso_x = (x - y) * tile_width // 2
    iso_y = (x + y) * tile_height // 2
    return iso_x, iso_y

# Dessin d'une tuile
def draw_tile(screen, x, y, elevation):
    color = (50 * elevation, 100 + 50 * elevation, 50)
    iso_x, iso_y = cart_to_iso(x, y)
    points = [
        (iso_x, iso_y),
        (iso_x + tile_width // 2, iso_y + tile_height // 2),
        (iso_x, iso_y + tile_height),
        (iso_x - tile_width // 2, iso_y + tile_height // 2)
    ]
    pygame.draw.polygon(screen, color, points)
    pygame.draw.lines(screen, (0, 0, 0), True, points, 1)

# Dessin du joueur
def draw_player(screen, x, y):
    iso_x, iso_y = cart_to_iso(x, y)
    pygame.draw.circle(screen, (255, 0, 0), (iso_x, iso_y - tile_height // 2), 10)

# Boucle principale
def main():
    map_data = generate_map(map_size)
    camera_x, camera_y = 0, 0
    dragging = False
    last_mouse_pos = (0, 0)
    
    # Position du joueur
    player_x, player_y = map_size // 2, map_size // 2
    
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            # Gestion du clic de souris
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:  # Clic gauche
                    dragging = True
                    last_mouse_pos = pygame.mouse.get_pos()
            elif event.type == pygame.MOUSEBUTTONUP:
                if event.button == 1:  # Relâchement du clic gauche
                    dragging = False
            elif event.type == pygame.MOUSEMOTION:
                if dragging:
                    # Calcul du déplacement de la souris
                    current_mouse_pos = pygame.mouse.get_pos()
                    dx = current_mouse_pos[0] - last_mouse_pos[0]
                    dy = current_mouse_pos[1] - last_mouse_pos[1]
                    
                    # Ajustement de la caméra (inversé pour un déplacement naturel)
                    camera_x -= dx / tile_width
                    camera_y -= dy / tile_height
                    
                    last_mouse_pos = current_mouse_pos
        
        # Déplacement du joueur avec les flèches
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            player_x -= 0.1
        if keys[pygame.K_RIGHT]:
            player_x += 0.1
        if keys[pygame.K_UP]:
            player_y -= 0.1
        if keys[pygame.K_DOWN]:
            player_y += 0.1
        
        # Limites de la carte pour le joueur
        player_x = max(0, min(player_x, map_size - 1))
        player_y = max(0, min(player_y, map_size - 1))
        
        screen.fill((255, 255, 255))
        
        # Dessin de la carte
        for y in range(map_size):
            for x in range(map_size):
                draw_x = x - int(camera_x)
                draw_y = y - int(camera_y)
                iso_x, iso_y = cart_to_iso(draw_x, draw_y)
                if -tile_width <= iso_x <= width + tile_width and -tile_height <= iso_y <= height + tile_height:
                    draw_tile(screen, draw_x, draw_y, map_data[y][x])
        
        # Dessin du joueur
        draw_player(screen, player_x - camera_x, player_y - camera_y)
        
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()