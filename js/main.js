'use strict';

// TODO
var reg;
var sub;
var isSubscribed = false;
var subscribeButton = document.querySelector('button');

/*if('serviceWorker' in navigator){
	console.log('Service Worker is supported');
	navigator.serviceWorker.register('sw.js').then(function (reg) {
		// body...
		console.log(':^', reg);
		reg.pushManager.subscribe({
			userVisibleOnly: true
		}).then(function (sub) {
			 console.log('endpoint: ', sub.endpoint);
		});
	}).catch(function (err) {
		// body...
		console.log(':^(', err);
	});
}
*/

if('serviceWorker' in navigator){
	console.log('Service Worker is supported');
	navigator.serviceWorker.register('sw.js').then(function () {
		 /* body... */ 
		 return navigator.serviceWorker.ready;
	}).then(function (serviceWorkerRegistration) {
		 reg = serviceWorkerRegistration;
		 subscribeButton.disabled = false;
		 console.log('Service Worker is ready :^', reg);
	}).catch(function (err) {
		 console.log('Service Worker Error :^(', err);
	});
}

subscribeButton.addEventListener('click', function () {
	 if (isSubscribed) {
	 	unsubscribe();
	 }else {
	 	subscribe();
	 }
});

function subscribe(){
	reg.pushManager.subscribe({userVisibleOnly:true}).then(function (pushSubscription) {
		 sub = pushSubscription;
		 console.log('Subscribed! Endpoint: ', sub.endpoint);
		 subscribeButton.textContent = 'Unsubscribe';
		 isSubscribed = true;
	});
}
function unsubscribe () {
	 // body...  
	 sub.unsubscribe().then(function (event) {
	 	 subscribeButton.textContent = 'Subscribe';
	 	 console.log('Unsubscribed!', event);
	 	 isSubscribed = false;
	 }).catch(function(error){
	 	console.log('Error Unsubscribing', error);
	 	subscribeButton.textContent = 'Subscribe';
	 });
}