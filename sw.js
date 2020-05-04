if(ServiceWorker in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/sw.js').
        then(function(registration){
            console.log('Successfully Completed - Registration Process')
        }, function(error){
            console.log('Error - Registration Process')
        })
    })
    self.addEventListener('install', function(){
        console.log('Successfully Completed - Installation Process')
    })
    }

