from random import randint
import json
import sys

def play_game(data_from_js):
    # Parse JSON data
    input_data = json.loads(data_from_js)

    r = 0
    p = 0
    w = 0

    while w == 0:
        print("1 = Schere, 2 = Stein, 3 = Papier")
        sx = int(input("Wahl:"))

        x = randint(1, 3)

        if x == sx:
            print("Unentschieden")
        elif x == 1 and sx == 2:
            print("Du hast gewonnen!")
            p += 1
        elif x == 1 and sx == 3:
            print("Lassus hat gewonnen!")
        elif x == 2 and sx == 3:
            print("Du hast gewonnen!")
            p += 1
        elif x == 2 and sx == 1:
            print("Lassus hat gewonnen!")
        elif x == 3 and sx == 1:
            print("Du hast gewonnen!")
            p += 1
        elif x == 3 and sx == 2:
            print("Lassus hat gewonnen!")

        r += 1
        print("Runden:", r)
        print("Punkte:", p)
        print("Noch eine Runde?")
        print("0 = Ja, 1 = Nein")

        w = int(input())

    return {'rounds': r, 'points': p}

if __name__ == "__main__":
    # Read input from stdin
    data_from_js = sys.stdin.read()

    # Play the game and print the result
    game_result = play_game(data_from_js)
    print(json.dumps(game_result))
