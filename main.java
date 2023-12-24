import java.applet.Applet;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class CharacterMovementApplet extends Applet implements KeyListener {
    private int x, y; // Initial position
    private int step = 5; // Movement step

    public void init() {
        setSize(800, 600); // Set the initial size of the applet
        setBackground(Color.BLACK); // Set background color
        addKeyListener(this); // Add key listener to the applet
        setFocusable(true); // Set focus to allow key events
        x = getWidth() / 2; // Initial X position at the center
        y = getHeight() / 2; // Initial Y position at the center
    }

    public void paint(Graphics g) {
        // Draw the movable image
        Image character = getImage(getDocumentBase(), "2.png");
        g.drawImage(character, x - character.getWidth(this) / 2, y - character.getHeight(this) / 2, this);
    }

    public void update(Graphics g) {
        paint(g);
    }

    public void keyPressed(KeyEvent e) {
        handleKey(e.getKeyCode());
    }

    public void keyReleased(KeyEvent e) {
        // Add any additional logic for key release if needed
    }

    public void keyTyped(KeyEvent e) {
        // Add any additional logic for key typing if needed
    }

    private void handleKey(int keyCode) {
        switch (keyCode) {
            case Ke
