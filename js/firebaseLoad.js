	
	// Initialize Firebasey
		var db;
		var config = {
		apiKey: "AIzaSyCiCqqp8VdRJX3yjfTCB9ab3OMYOhkWXxw",
		authDomain: "m152-bildergalerie.firebaseapp.com",
		databaseURL: "https://m152-bildergalerie.firebaseio.com",
		projectId: "m152-bildergalerie",
		storageBucket: "m152-bildergalerie.appspot.com",
		messagingSenderId: "830519807227"
		};

		var app = firebase.initializeApp(config);
		db = firebase.firestore(app);
		//firebase.firestore.setLogLevel("debug");

		const storageService = firebase.storage();
		const storageRef = storageService.ref();
		
		document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
		document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);
		
		
		let selectedFile;
		function handleFileUploadChange(e) {
		selectedFile = e.target.files[0];
	}

	/*
	function handleFileUploadSubmit(e) {
		const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
		uploadTask.on('state_changed', (snapshot) => {
		// Observe state change events such as progress, pause, and resume
		}, (error) => {
		// Handle unsuccessful uploads
		console.log(error);
		}, () => {
		// Do something once upload is complete
		console.log('success');
		alert(`File uploaded`);
		});
	} */


	function handleFileUploadSubmit(e) {
		var uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on('state_changed', function(snapshot){
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
			case firebase.storage.TaskState.PAUSED: // or 'paused'
				console.log('Upload is paused');
				break;
			case firebase.storage.TaskState.RUNNING: // or 'running'
				console.log('Upload is running');
				break;
			}
		}, function(error) {
			// Handle unsuccessful uploads
		}, function() {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				

				var string = `${downloadURL}`,
				substringVodka = "Vodka";
				substringGin = "Gin";
				substringRum = "Rum";

				//Vodka
				if(string.includes(substringVodka)){
					db.collection("vodka").doc("img_" + Date.now()).set({
					downloadURL: downloadURL
				})
				.then(function() {
				console.log("Document successfully written!");
				})
				.catch(function(error) {
						console.error("Error writing document: ", error);
				});
				
				console.log('File available at', downloadURL);
				}
				
				//Gin
				else if(string.includes(substringGin)){
					db.collection("gin").doc("img_" + Date.now()).set({
					downloadURL: downloadURL
					})
					.then(function() {
					console.log("Document successfully written!");
					})
					.catch(function(error) {
							console.error("Error writing document: ", error);
					});
					
					console.log('File available at', downloadURL);
				}
				
				//Rum
				else if(string.includes(substringRum)){
					db.collection("rum").doc("img_" + Date.now()).set({
					downloadURL: downloadURL
					})
					.then(function() {
					console.log("Document successfully written!");
					})
					.catch(function(error) {
							console.error("Error writing document: ", error);
					});
					
					console.log('File available at', downloadURL);
				}
				//to images
				else{
					db.collection("images").doc("img_" + Date.now()).set({
					downloadURL: downloadURL
					})
					.then(function() {
					console.log("Document successfully written!");
					})
					.catch(function(error) {
							console.error("Error writing document: ", error);
					});
					
					console.log('File available at', downloadURL);
				}

				
			});
		});
	}

	// Get image path from firebase
	function getImages(){

		
	}




//Load images from firebase
document.addEventListener('DOMContentLoaded', function() {
	
	//Gin
	db.collection("gin").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {

		console.log(doc.data().downloadURL);

		
			const firebaseImagesGin = document.getElementById('firebaseImagesGin');
			
			const galeryImageGin = document.createElement('div');
			galeryImageGin.classList.add('col-md-2');
			galeryImageGin.classList.add('single-item');
			const tileImageGin = document.createElement('a');
			tileImageGin.setAttribute('href', doc.data().downloadURL);
			tileImageGin.className = "img-pop-up";
			const popupImageGin = document.createElement('div');
			popupImageGin.className = "single-gallery-image";
			popupImageGin.style = `background: url(${doc.data().downloadURL});`;
			tileImageGin.appendChild(popupImageGin);
			galeryImageGin.appendChild(tileImageGin);
			firebaseImagesGin.appendChild(galeryImageGin);
			
			
			//<div class="top-left">Top Left</div>
				});
			
		});
		
	//Rum
	db.collection("rum").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {

		console.log(doc.data().downloadURL);

		
			const firebaseImagesRum = document.getElementById('firebaseImagesRum');
			
			const galeryImageRum = document.createElement('div');
			galeryImageRum.classList.add('col-md-2');
			galeryImageRum.classList.add('single-item');
			const tileImageRum = document.createElement('a');
			tileImageRum.setAttribute('href', doc.data().downloadURL);
			tileImageRum.className = "img-pop-up";
			const popupImageRum = document.createElement('div');
			popupImageRum.className = "single-gallery-image";
			popupImageRum.style = `background: url(${doc.data().downloadURL});`;
			tileImageRum.appendChild(popupImageRum);
			galeryImageRum.appendChild(tileImageRum);
			firebaseImagesRum.appendChild(galeryImageRum); 
			
				});
			
		});
			
	//Vodka
	db.collection("vodka").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {

			console.log(doc.data().downloadURL);
		
			const firebaseImagesVodka = document.getElementById('firebaseImagesVodka');
			
			const galeryImageVodka = document.createElement('div');
			galeryImageVodka.classList.add('col-md-2');
			galeryImageVodka.classList.add('single-item');
			const tileImageVodka = document.createElement('a');
			tileImageVodka.setAttribute('href', doc.data().downloadURL);
			tileImageVodka.className = "img-pop-up";
			const popupImageVodka = document.createElement('div');
			popupImageVodka.className = "single-gallery-image";
			popupImageVodka.style = `background: url(${doc.data().downloadURL});`;
			tileImageVodka.appendChild(popupImageVodka);
			galeryImageVodka.appendChild(tileImageVodka);
			firebaseImagesVodka.appendChild(galeryImageVodka); 

			});

			$('select').niceSelect();
				$('.img-pop-up').magnificPopup({
				type: 'image',
				gallery:{
				enabled:true
				}
			});
			
		});

});


			
			

			// try to add img to pop-up gallery
			/*const asdf1 = document.createElement('div');
			asdf1.classList.add('mfp-bg');
			asdf1.classList.add('mfp-ready');
			asdf1.style = "overflow: hidden auto;"
			const asdf2 = document.createElement('div');
			asdf2.classList.add('mfp-wrap');
			asdf2.classList.add('mfp-gallery');
			asdf2.classList.add('mfp-close-btn-in');
			asdf2.classList.add('mfp-auto-cursor');
			asdf2.classList.add('mfp-ready');
			const asdf3 = document.createElement('div');
			const newImg = document.createElement('div');
			newImg.classList.add('mfp-content');
			const newImg2 = document.createElement('div');
			newImg2.classList.add('mfp-figure');
			const newImg3 = document.createElement('button');
			newImg3.classList.add('mfp-closee');
			newImgFigure = document.createElement('figure');
			figureIMG = document.createElement('img');
			figureIMG.classList.add("mfp-img");
			figureIMG.setAttribute('src', doc.data().downloadURL);
			figureIMG.style = "max-height: 257px;";
			const figcaption = document.createElement('figcaption');
			const mfpBottom = document.createElement('div');
			mfpBottom.classList.add('mfp-bottom-bar');
			const mfpTitle = document.createElement('div');
			mfpTitle.classList.add('mfp-title');
			const mfpCounter = document.createElement('div');
			mfpCounter.classList.add('mfp-counter');

			asdf1.appendChild(asdf2);
			asdf2.appendChild(asdf3);
			asdf3.appendChild(newImg)
			newImg.appendChild(newImg2);
			newImg2.appendChild(newImg3);
			newImg3.appendChild(newImgFigure);
			newImgFigure.appendChild(figureIMG);
			figureIMG.appendChild(figcaption);
			figcaption.appendChild(mfpBottom);
			mfpBottom.appendChild(mfpTitle);
			mfpBottom.appendChild(mfpCounter);*/

		/*		<div class="col-md-2 single-item">
							<a href="img/Gin_GB.jpeg" class="img-pop-up">
								<div class="single-gallery-image" style="background: url(img/Gin_GB.jpeg);" ></div></a>
						</div> 	*/
	