// Use self instead of this to adhere to conventions
// Check if the browser supports notifications
// if ('Notification' in window) {
// 	// Check if notification permission has already been granted
// 	if (Notification.permission === 'granted') {
// 	  // You have permission, you can display notifications
// 	} else if (Notification.permission !== 'denied') {
// 	  // Notification permission has not been granted or denied, ask for permission
// 	  Notification.requestPermission().then(permission => {
// 		if (permission === 'granted') {
// 		  // Permission granted, you can display notifications
// 		}
// 	  });
// 	}
//   }
  
this.addEventListener("install", function (event) {
    event.waitUntil(preLoad());
});

this.addEventListener("fetch", function (event) {
    event.respondWith(
        checkResponse(event.request).catch(function () {
            console.log("Fetch from cache successful!");
            return returnFromCache(event.request);
        })
    );
    // Moved inside respondWith to correctly reflect fetch success
	console.log("Fetch Successful");
    event.waitUntil(addToCache(event.request));
});

this.addEventListener("sync", (event) => {
    if (event.tag === "syncMessage") {
        console.log("Sync successful!");
    }
});

this.addEventListener("push", function (event) {
	if (event && event.data) {
	try {
	var data = event.data.json();
	if (data && data.method === "pushMessage") {
	console.log("Push notification sent");
	this.registration.showNotification("Ecommerce website", {
	body: data.message,
	});
	}
	} catch (error) {
	console.error("Error parsing push data:", error);
	}
	}
	});

function preLoad() {
    return caches.open("offline").then(function (cache) {
        // caching index and important routes
        return cache.addAll([
            "/",
            "/index.html",
            "/index.css",
			"/offline.html"
        ]);
    });
}

function checkResponse(request) {
    return new Promise(function (fulfill, reject) {
        fetch(request)
            .then(function (response) {
                if (response.status !== 404) {
                    fulfill(response);
                } else {
                    reject(new Error("Response not found"));
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function returnFromCache(request) {
    return caches.open("offline").then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || cache.match("/offline.html");
        });
    });
}


function addToCache(request) {
    return caches.open("offline").then(function (cache) {
        return fetch(request).then(function (response) {
            if (!response.ok && response.status !== 404) {
                throw new Error(`Failed to fetch and cache: ${request.url}, Status: ${response.status}`);
            }
            return cache.put(request, response.clone()).then(function () {               
                return response;
            });
        }).catch(error => {
            console.error(`Fetch failed for ${request.url}:`, error);
            throw error; // Rethrow after logging to ensure calling code can handle it.
        });
    });
}
