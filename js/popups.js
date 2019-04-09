var locationPopupExpanded = false;
var locationPopupCloseCallback = null;

function initPopups() {
	$("#locationPopup").hide();
	$("#aircraftInfoPopup").hide();
	$("#basePopup").hide();

    // handle touch events on popups
    var popupHeader = $("#popupHeader");
    var locationPopup = $("#locationPopup");
    var aircraftListContainer = $("#aircraftListContainer");
    var normalHeight = 200;

    // popupHeader.on("click", function(event) {
    //     if (!locationPopupExpanded) {
    //         var maxHeight = Math.min($("#map").height(), $("#aircraftsList").height() + 50);
    //
    //         aircraftListContainer.animate({height: maxHeight - 50 + "px"}, "fast");
    //         locationPopup.animate({height: maxHeight + "px"}, "fast");
    //         locationPopupExpanded = true;
    //     } else {
    //         var maxHeight = normalHeight;
    //
    //         aircraftListContainer.animate({height: maxHeight - 50 + "px"}, "fast");
    //         locationPopup.animate({height: maxHeight + "px"}, "fast");
    //         locationPopupExpanded = false;
    //     }
    //     event.preventDefault();
    // });

    var dragStartTopY;
    var currHeight;
    var maxHeight;
    var delta;

    popupHeader.on("tapstart", function (event) {
        dragStartTopY = event.touches[0].clientY;
        currHeight = locationPopup.height();
        maxHeight = Math.min($("#aircraftsList").height()+50, $("#map").height());
        event.preventDefault();
    });

    popupHeader.on("tapmove", function (event) {
        if (dragStartTopY != null) {
            delta = dragStartTopY - event.touches[0].clientY;
            var targetHeight = currHeight + delta;
            if (targetHeight >= maxHeight)
                targetHeight = maxHeight;

            locationPopup.height(targetHeight);
            aircraftListContainer.height(targetHeight - 50);
            event.preventDefault();
        }
    });

    popupHeader.on("tapend", function (event) {
        if (dragStartTopY != null) {
            var targetHeight = currHeight + delta;
            if (targetHeight < 100) {
                hideLocationPopup(null);
                getMapUndark();
                if (locationPopupCloseCallback != null)
                    locationPopupCloseCallback.call(this);
            }
            else if (targetHeight >= 0.5 * maxHeight) {
                locationPopup.animate({height: maxHeight + "px"}, "fast");
                aircraftListContainer.animate({height: maxHeight - 50 + "px"}, "fast");
            } else {
                locationPopup.animate({height: normalHeight + "px"}, "fast");
                aircraftListContainer.animate({height: normalHeight - 50 + "px"}, "fast");
            }
            dragStartTopY = null;
        }
    });

}

function showLocationPopup(point, color, titleColor, subtitleColor, minimized=false, closeCallback) {
    locationPopupCloseCallback = closeCallback;

    // build popup html
    var html = "";
    locationPopupExpanded = false;

    point.aircrafts.forEach(function (aircraft) {
        html += createTableRow(aircraft.aircraftId, aircraft.name, aircraft.icon, aircraft.aircraftType, aircraft.time, aircraft.aerobatic, aircraft.parachutist, false, true);
    }, this);
    $("#aircraftsList").html(html);
    $("#popupTitle").text(point.pointName);

    // show a description of the location
    if (point.pointLocation)
    	$("#popupSubTitle").text(point.pointLocation);
    else
    	$("#popupSubTitle").text("");

    // show times of the activity (aircraft times or base activity times)
    if (point.activeTimes)
        $("#popupTime").text(point.activeTimes);
    else
        $("#popupTime").text(point.aircrafts[0].time.substr(0, 5) + "-" + point.aircrafts[point.aircrafts.length - 1].time.substr(0, 5));

    // enable waze link if available
    if (point.wazeLink) {
        $("#wazeLink").attr("href", point.wazeLink);
        $("#wazeLink").show();
    } else {
        $("#wazeLink").hide();
    }
    $("#popupHeader").css("background", "#F7F5F5");
    $("#popupTitle").css("color", "#2b2b2b");
    $("#popupSubTitle").css("color", "#2b2b2b");

    if (!minimized)
    	getMapDarker();

    var locationPopup = $("#locationPopup");

    // animate popup coming from bottom
    var targetHeight = minimized ? 100 : 200;

    locationPopup.height(0);
    locationPopup.show();
    locationPopup.animate({
        height: targetHeight + "px"
    }, "fast");

    // // add touch events on the list to allow user expand or collapse it
    $("#aircraftListContainer").scrollTop(0);

}

function hideLocationPopup(callback) {
    var locationPopup = $("#locationPopup");
    locationPopup.animate({height: "0px"}, "fast", function() {
        locationPopup.hide();
        if (callback != null)
            callback.call(this);
    });
    $("#aircraftListContainer").animate({height:"150px"}, "fast");
}

function showAircraftInfoPopup(aircraft, collapse) {
	$("#aircraftInfoName").text(aircraft.name);
	$("#aircraftInfoType").text(aircraft.type);
	$("#aircraftInfoStartTime").text(roundToMinute(aircraft.path[0].time));
	$("#aircraftInfoIcon").attr("src", "icons/aircraft-menu/"+aircraft.icon+".svg");
	$("#aircraftInfoContentDescription").text(aircraft.description);
	$("#aircraftInfoContentClassification").text(aircraft.classification);
	$("#aircraftInfoContentCountry").text(aircraft.manufactured);
	$("#aircraftInfoContentDimensions").text(aircraft.dimensions);
	$("#aircraftInfoContentPerformance").text(aircraft.performance);
	$("#aircraftInfoContentWeight").text(aircraft.weight);
	$("#aircraftInfoContentEngine").text(aircraft.engine);
	$("#aircraftInfoBanner").attr("src", aircraft.image);

	getMapDarker();

	if (!aircraft.armament) {
		$("#aircraftInfoContentArmamentContainer").css("display", "none");
	} else {
        $("#aircraftInfoContentArmamentContainer").css("display", "flex");
        $("#aircraftInfoContentArmament").text(aircraft.armament);
	}

	// Clears event handlersh
    $("#aircraftInfoMore").off("click");
    $("#shrinkAircraftInfoPopup").off("click")

	if (!collapse) {
        $("#aircraftInfoMore").on("click", function () {
            var height = $(window).height();
            $("#aircraftInfoMore").css("display", "none");
            $("#aircraftInfoPopup").animate({"height": height + "px"}, 500);
            $("#shrinkAircraftInfoPopup").css("display", "block");
            $("#expandedInfo").css("display", "block");
        });

        $("#shrinkAircraftInfoPopup").on("click", function () {
            $("#aircraftInfoMore").css("display", "block");
            $("#aircraftInfoMore").css("height", "32px");
            $("#expandedInfo").css("display", "none");
            $("#shrinkAircraftInfoPopup").css("display", "none");
            var $aircraftInfoPopup = $('#aircraftInfoPopup');
            var curHeight = $aircraftInfoPopup.height();
            $aircraftInfoPopup.css('height', 'auto');
            var autoHeight = $aircraftInfoPopup.height();
            $aircraftInfoPopup.height(curHeight).animate({height: autoHeight}, 500, function () {
                $aircraftInfoPopup.height('auto');
            });
        });
    } else {
        var height = $(window).height();
        $("#aircraftInfoMore").css("display", "none");
        $("#aircraftInfoPopup").height("0px");
        $("#aircraftInfoPopup").animate({"height": height + "px"}, 500);
        $("#shrinkAircraftInfoPopup").css("display", "block");
        $("#expandedInfo").css("display", "block");

        $("#shrinkAircraftInfoPopup").on("click", function () {
           hideAircraftInfoPopup();
        });
    }

	var popupHeight = $("#locationPopup").height();
	$("#aircraftInfoPopup").css("bottom", -popupHeight);
	$("#aircraftInfoPopup").show();
	$("#aircraftInfoPopup").animate({
            bottom: "0px"
        }, "fast");

    setTimeout(function() {
        $("#listView").hide();
    }, 500);
}

function hideAircraftInfoPopup(callback) {
	hidePopup("#aircraftInfoPopup", function() {
			$("#aircraftInfoBanner").attr("src", "");
			if (callback) {
                callback.call(this);
            }
	});
    $("#listView").show();
}

function hidePopup(popup, callback) {
    getMapUndark();
	$(popup).animate({
            bottom: -$(popup).height() + "px"
        }, "fast", "swing", function() {
			$(popup).hide();
			callback.call(this);
	});
}

function createParachutistRow(name, time) {
    return "<div class=\"tableRow aerobatic\"><img src=\"icons/aircraft-menu/parachutist.svg\" class=\"parachutistIcon\"></img> <div class=\"aircraftName\"><b>" + name +
        "</b></div><div class=\"time\">" +roundToMinute(time)+ "</div></div>";
}

function createAerobaticRow(name, time) {
    return "<div class=\"tableRow aerobatic\"><img src=\"icons/aircraft-menu/aerobatic.svg\" class=\"aerobaticIcon\"></img> <div class=\"aircraftName\"><b>"+ name +
        "</b></div><div class=\"time\">"+ roundToMinute(time) +"</div></div>";
}

function createTableRow(aircraftId, name, icon, aircraftType, time, aerobatic, parachutist, collapse, displayTime=true) {
	var aerobaticIcon = "<div/>";
	if (aerobatic) {
		aerobaticIcon = "<img src=\"icons/aircraft-menu/aerobatic.svg\" class=\"aerobaticTableIcon\"></img>";
		aircraftType = "מופע אווירובטי";
	} else if (parachutist) {
        aerobaticIcon = "<img src=\"icons/aircraft-menu/parachutist.svg\" class=\"aerobaticTableIcon\"></img>";
        aircraftType = "הצנחת צנחנים";
	}

	return "<div onclick='onAircraftSelected("+aircraftId+ "," + collapse.toString() + ");' class=\"tableRow\"><img src=\"icons/aircraft-menu/" + icon +
		   ".svg\" class=\"aircraftIcon\"><div class=\"aircraftName\"><b>"+ name +
		   "</b> " + aircraftType + "</div>" + aerobaticIcon + "<div class=\"time\">"+(displayTime?roundToMinute(time):"") + "</div></div></div></div>";
}

function createLocationRow(location, displayFirstAircraft) {
	if (location.aircrafts.length == 0)
		displayFirstAircraft = false;

    return "<a class='locationRow' href='javascript:void(0);'><div id='location"+location.pointId+"' class='locationRow' onclick='expandLocation("+location.pointId+");'>" +
                "<div class='locationName'>"+location.pointName+"</div>" +
                "<div class='nextAircraftSection'>"+
                    (displayFirstAircraft ? "<div class='smallAircraftName'>"+location.aircrafts[0].name+"</div>" : "") +
                    "<div class='nextAircraftTime'>"+(displayFirstAircraft ? roundToMinute(location.aircrafts[0].time) : "") +"</div>" +
                    "<div class='expandArrow'><img src='icons/arrowBlack.png'></div>" +
                    "<div class='collapseArrow'><img src='icons/arrowBlackUp.png'></div>" +
                "</div>" +
           "</div></a>" +
           "<div id='locationSpace"+location.pointId+"' class='locationSpace'></div>" +
           "<div class='locationPadding'></div>";
}

function expandLocation(pointId) {
    var location = locations[pointId];
    var locationSpace = $("#locationSpace"+pointId);
    if (locationSpace.html()==="") {
        var html = "";
        var lastAircraft = "";
        location.aircrafts.forEach(function (aircraft) {
            if (aircraft.name !== lastAircraft) {
                html += createTableRow(aircraft.aircraftId,
                    aircraft.name,
                    aircraft.icon,
                    aircraft.aircraftType,
                    aircraft.time,
                    aircraft.aerobatic,
                    aircraft.parachutist,
                    true,
                    true);
                lastAircraft = aircraft.name;
            }
        }, this);
        locationSpace.html(html);
        locationSpace.slideDown();
        $("#location"+pointId).children(".nextAircraftSection").children(".expandArrow").hide();
        $("#location"+pointId).children(".nextAircraftSection").children(".collapseArrow").show();
    } else {
        locationSpace.slideUp("fast", function() {
            locationSpace.html("");
            $("#location"+pointId).children(".nextAircraftSection").children(".expandArrow").show();
            $("#location"+pointId).children(".nextAircraftSection").children(".collapseArrow").hide();
        });
    }

}

function showIncompatibleDevicePopup() {
    $("#aboutButton").hide();
    $("#homeButton").hide();
    $("#incompatibleBrowserPopup").show();
}

function showConfirmationPopup(title, messageBody) {
    getMapDarker();
    closeAllPopups();
    $('#confirmationPopup').show();
}

function hideConfirmationPopup() {
    $('#confirmationPopup').fadeOut();
    getMapUndark();
    Notification.requestPermission().then(function(result) {
        if (result === 'granted') {
            Notification.permission = result;
            scheduleFlightStartNotification();
        }
    });
}

var notificationTitle = 'מטס עצמאות 71';
var notificationOptions =
    {
        body: '',
        icon: '../icons/logo192x192.png',
        dir: "rtl",
        lang: 'he',
        //TODO: add badge here
        badge: '../icons/logo192x192.png',
        vibrate: [300, 100, 400],
        data: { url: 'https://matas-iaf.com', sentNotifications: [] }
    };

var notificationMessage =
    {
        "notificationTitle": notificationTitle,
        "notificationOptions": notificationOptions,
        "notificationTime": 500
    };

function createNotificationMessage(title, options, time) {
    notificationMessage.notificationTitle = title;
    notificationMessage.notificationOptions = options;
    notificationMessage.notificationTime = time;

    return notificationMessage;
}

function scheduleFlightStartNotification() {
    var FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;

    // Five minutes before flight start
    var remainingTime = actualStartTime - FIVE_MINUTES_IN_MILLISECONDS - getCurrentTime();

    // Only display the message when we have 5 minutes or more remaining
    if (remainingTime >= 0 && Notification.permission === 'granted') {
        notificationOptions.body = 'המטס יתחיל בעוד 5 דקות!';
        notificationOptions.icon = '../icons/logo192x192.png';

        // We only schedule if we haven't already
        if (!localStorage.getItem(notificationOptions.body)) {
            localStorage.setItem(notificationOptions.body, notificationOptions.body);
            navigator.serviceWorker.controller.postMessage(createNotificationMessage(notificationTitle, notificationOptions, remainingTime));
            notificationOptions.data.sentNotifications.push(notificationOptions.body);
        }
    }
}

function getEventName(isAerobatics) {
    return isAerobatics ? 'מופע אווירובטי' : 'הצנחות';
}

function getEventDescription(isAerobatics, locationName, minutes) {
    var desc = isAerobatics ? 'יחל ב' : 'יחלו ב';
    return `${desc}${locationName} בעוד ${minutes} דקות`;
}

function showBasePopup(isAerobatics, minutes, locationName) {
	var html = "<b class=\"baseData\">";
    html += getEventName(isAerobatics);

	if (isAerobatics) {
        $("#showAeroplanIcon").show();
        $("#showParachutingIcon").hide();
    } else {
        $("#showAeroplanIcon").hide();
        $("#showParachutingIcon").show();
    }

    html += "</b><br class=\"baseData\">";
	// var eventDetails = `${desc}${baseName} בעוד ${minute} דקות`;
	html += getEventDescription(isAerobatics, locationName, minutes);
    $("#showData").html(html);
    $("#basePopup").css("top", -64);
    $("#basePopup").show();
    $("#basePopup").animate({
        top: 64 + "px"
    }, 600);
}

function getEventIcon(isAerobatics) {
    return isAerobatics ? 'images/aeroplan.png' : 'images/parachuting.png';
}

function hideBasePopup() {
    $("#basePopup").animate({
        top: -64 + "px"
    }, "fast", "swing", function() {
        $("#basePopup").hide();
    });
}

function getMapDarker() {
    $mapDark = $(".map-dark");
    $mapDark .animate({
        opacity: 0.4},200);
    $mapDark .css("pointer-events","all");
}

function getMapUndark() {
    $mapDark = $(".map-dark");
    $mapDark.animate({
        opacity: 0.1},200);
    $mapDark.css("pointer-events","none");
}

function createClusterLocationRow(location) {
    return "<div onclick='selectPoint(" + location.pointId + ");' class=\"tableRow\"><img src=\"icons/group2.png\" class=\"locationIcon\"><div class=\"aircraftName\"><b>"
        + location.pointName + "</b></div></div></div>";
}

function openMapClusterPopup(arrayOfObjects) {
    console.log("opened")
    getMapDarker();

    var contentDiv = $("#mapClusterPopupContent");
    var html = "";
    var lastAircraft = "";

    contentDiv.on("click", "*", () => closeMapClusterPopup(false));

    // Populating the popup
    arrayOfObjects.forEach((obj) => {
        // In the case of aircraft
       if (obj.aircraftId && obj.name != lastAircraft) {
           html += createTableRow(obj.aircraftId, obj.name, obj.icon, obj.type, obj.path[0].time, obj.aerobatic, obj.parachutist, false, false);
           lastAircraft = obj.name;
       } else if (obj.pointId) {
           html += createClusterLocationRow(obj)
       }
    });

    contentDiv.html(html);
    contentDiv.scrollTop(0);

    $("#mapClusterPopupFooter").on("click", () => closeMapClusterPopup(true))
    $("#mapClusterPopup").fadeIn();
}

function closeMapClusterPopup(clearMap) {
    // deselectLocation();
    if (clearMap) {
        getMapUndark();
    }
    $("#mapClusterPopup").fadeOut();
}

function closeAllPopups() {
    deselectLocation();
    deselectAircraft();
    closeMapClusterPopup(true);
}

$(document).ready(function() {
	//window.scrollTo(0,document.body.scrollHeight);
});
