from flask import Flask, render_template, request, redirect, url_for
from random import randint, choice
from flask import make_response

app = Flask(__name__)

def is_blocked(kontostand):
    return int(kontostand) < 0

@app.route('/')
def index():
    return render_template('index.HTML')

@app.route('/hub')
def hub():
    return render_template('hub.HTML')

@app.route('/impressum')
def impress():
    return render_template('impress.HTML')

@app.route('/rps')
def rock_paper_scissors():
    return render_template('Schnik.HTML')

@app.route('/slot_machine', methods=['GET', 'POST'])
def slot_machine():
    kontostand = request.cookies.get('kontostand', '200')  # Standardwert 200

    if is_blocked(kontostand):
        return render_template('blocked.html')  # Hier könntest du eine Seite anzeigen, die den blockierten Status informiert

    gewonnen = False
    user_symbols = None

    if request.method == 'POST':
        symbols = ['IMGs/c', 'IMGs/l', 'IMGs/b', 'IMGs/s']
        user_symbols = [choice(symbols) for _ in range(3)]

        # Überprüfung, ob alle Symbole gleich sind
        if all(symbol == user_symbols[0] for symbol in user_symbols):
            gewonnen = True

        kontostand = int(kontostand) + (+500 if gewonnen else -50)  # Beispielwerte für Gewinn und Verlust

        # Setze den neuen Kontostand als Cookie
        response = make_response(render_template('slot_machine.html', gewonnen=gewonnen, user_symbols=user_symbols, kontostand=kontostand))
        response.set_cookie('kontostand', str(kontostand))
        return response

    return render_template('slot_machine.html', gewonnen=gewonnen, user_symbols=user_symbols, kontostand=kontostand)
@app.route('/result', methods=['POST', 'GET'])
def result():
    gewonnen = False
    verloren = False
    unentschieden = False

    if request.method == 'POST':
        user_input = int(request.form['wahl'])
        computer_choice = randint(1, 3)
        if user_input == computer_choice:
            unentschieden = True
        elif (user_input == 1 and computer_choice == 2) or \
             (user_input == 2 and computer_choice == 3) or \
             (user_input == 3 and computer_choice == 1):
            gewonnen = True
        else:
            verloren = True

    return render_template('Schnik.HTML', gewonnen=gewonnen, verloren=verloren, unentschieden=unentschieden)

@app.route('/roulette', methods=['GET', 'POST'])
def roulette():
    kontostand = request.cookies.get('kontostand', '200')  # Standardwert  200
    
    if is_blocked(kontostand):
        return render_template('blocked.html')  # Hier könntest du eine Seite anzeigen, die den blockierten Status informiert

    gewonnen = False
    result = None
    color = None
    einsatz = 0
    gewinn = 0
    
    if request.method == 'POST':
        numbers = list(range(0, 37))
        result = choice(numbers)

        if result == 0:
            color = 'green'
        elif result in [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]:
            color = 'red'
        else:
            color = 'black'
        
        einsatz = int(request.form.get('einsatz', 0))
        wette = request.form.get('wette')

        if wette.isdigit():  # Zahl wetten
            gewonnen = int(wette) == result
            gewinn = einsatz * 36 if gewonnen else 0
        elif wette.lower() in ['rot', 'schwarz', 'grün']:  # Farbige wetten
            gewonnen = (color == 'red' and wette.lower() == 'rot') or (color == 'black' and wette.lower() == 'schwarz') or (color == 'green' and wette.lower() == 'grün')
            gewinn = einsatz * 2 if gewonnen else 0

        kontostand = int(kontostand) + gewinn - einsatz
        # Setze den neuen Kontostand als Cookie
        response = make_response(render_template('roulette.html', result=result, color=color, einsatz=einsatz, gewonnen=gewonnen, gewinn=gewinn, kontostand=kontostand))
        response.set_cookie('kontostand', str(kontostand))
        return response

    return render_template('roulette.html', result=result, color=color, einsatz=einsatz, gewonnen=gewonnen, gewinn=gewinn, kontostand=kontostand)


if __name__ == '__main__':
    app.run(debug=True)