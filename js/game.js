(function (Phaser) {

    var game = new Phaser.Game (
	        1000, 500, // le dimensioni del gioco in X e Y
	        Phaser.Auto, /* il rendering grafico del gioco
	        con AUTO determina se WebGL è supportato e usa quello, 
	        altrimenti di default userà Canvas*/
	        'phaser', // il nome della div in index
	        {
	        	preload: preload, // la funzione di preload, caricamento anticipato
	        	create: create, // la funzione di creazione, inizializzazione gioco 
	        	update: update // la funzione di update (per il loop)
	        }

    );

    function preload() {
    	// carica lo spritesheet "giocatore.png" specificando la dimensione del frame
    	game.load.spritesheet('giocatore', 'assets/giocatore.png', 26, 64);
    }

   /* i numeri positivi nel movimento rappresentano la direzione Destra e Giù, mentre
   i negativi Sinistra e Su */

    var player; // lo sprite controllato dal giocatore
    var facing = "left"; // la direzione iniziale del giocatore
    var hozMove = 160; // lo spazio di movimento orizzontale (destra)
    var vertMove = -120; // lo spazio di movimento verticale (saltando)
    var jumpTimer = 0; // il valore del salto

    function create() {

    	// Imposta il colore di background 
    	game.stage.backgroundColor = '#3366ff';

    	// Inizia la Fisica del gioco (in questo caso ARCADE)
    	game.physics.startSystem(Phaser.Physics.ARCADE);

    	// Aggiungo lo sprite del giocatore
    	// definendo X e Y come posizione di partenza
    	// e prendendo come nome quello dello sprite definito nel preload
    	player = game.add.sprite(2 * 48, 6 * 48, 'giocatore');

    	// Di default, gli sprite non hanno un corpo fisico
        // prima di impostarne le proprietà lo "abilitiamo"
        // in questo modo, prendendo i default di ARCADE
        // il giocatore risponderà alle conseguenti leggi fisiche
    	game.physics.enable(player);

    	// Imposta la collisione del giocatore con i confini del mondo
    	player.body.collideWorldBounds = true;

    	// Imposta il valore di gravità verticale (Y) del giocatore
    	// il numero rappresenta la forza di pressione che spinge il 
    	// giocatore verso il basso dopo il salto
    	player.body.gravity.y = 96;

    	// Imposta le dimensioni dello sprite del giocatore
    	player.scale.setTo(2);

    	// lascia lo sprite del giocatore pixelloso!
    	player.smoothed = false;  

    }

    function update() {

    	// Resetta la velocità X a 0 ogni volta che il ciclo update si ripete
    	player.body.velocity.x = 0;

    	// Controlla se il tasto sinistro è premuto
    	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    	{
    		// Diamo al giocatore una velocità x al negativo
    		// che lo sposterà a sinistra
    		player.body.velocity.x = -hozMove;

    		// Controlla se la direzione non è Sinistra
    		if (facing !== "left")
    		{
    			// Imposta la direzione a Sinistra
    			facing = "left";
    		}

    	}

    	// Controlla se il tasto destro è premuto
    	else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    	{
    		// Diamo al giocatore una velocità x al positivo
    		// che lo sposterà a destra
    		player.body.velocity.x = hozMove;

    		// Controlla se la direzione non è Sinistra
    		if (facing !== "right")
    		{
    			// Imposta la direzione a Sinistra
    			facing = "right";
    		}

    	}

    	// Controlla se la barra spaziatrice (Tasto Salto) è premuto
    	// se il giocatore è sul suolo (onFloor) 
    	// e se il valore del salto è superiore al "JumpTimer"
    	// questo per impedire che salti mentre si trova già per aria
    	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.body.onFloor() && game.time.now > jumpTimer)
    	{
    		// Imposta la velocità Y (verticale) del giocatore in negativo
    		// spostandolo verso l'alto (la variabile vertMove è a -120
    		// impostata sopra)
    		player.body.velocity.y = vertMove;

    		// 500 = durata del salto in millesecondi  
    		jumpTimer = game.time.now + 500;
    	}	

    	// Controlla se la direzione è Sinistra
    	if (facing === "left")
    	{
    	   // Imposta il giocatore al secondo frame
    	   // corrispondente alla direzione sinistra
    	   // (il numero è 1 perché si conta anche lo 0)
    	   player.frame = 1;
    	} else {
    	   // Imposta il giocatore al primo frame
    	   // corrispondente alla direzione destra
    	   player.frame = 0;
    	}


    }


} (Phaser));