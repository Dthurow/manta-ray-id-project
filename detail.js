
var app = new Vue({
    el: '#app',
    data: {
        uri: "https://www.mantarays.info/mantaraysapp/v1/manta-server.php?p=2&m=",
        imageURI: "https://www.mantarays.info/mantaraysapp/v1/photo-server.php?m=",
        imageSrc: "https://www.mantarays.info/MantaDatabaseImages/",
        sightingsURI: "https://www.mantarays.info/mantaraysapp/v1/sighting-server.php?m=",
        sightingsDate: "2019-01-01",
        manta: {},
        sightings: null,
        slideIndex: 1,
        sexDict: {
            "F": "Female",
            "M": "Male",
            "U": "Unknown"
        },
        speciesDict: {
            "A": "Alfredi (reef)",
            "B": "Birostris (pelagic)"
        },
        colorDict: {
            "0": "Light",
            "1": "Black"
        },

    },
    computed: {
        firstSize: function ()
        {
            if (this.manta.lowerRange && this.manta.upperRange) {
                var tempString;
                if (this.manta.lowerRange == this.manta.upperRange) {
                    tempString = "~" + this.manta.lowerRange + " feet";

             } else {
                    tempString = "~" + this.manta.lowerRange + "-" + this.manta.upperRange + " feet";                  
              }
              if (this.manta.PupInitially === "1")
                  tempString = tempString + " (pup)";
              return tempString;
            } else {
                return "Unknown";
            }
        },
        currentSize: function ()
        {
            if (this.manta.Deceased === "1")
                return "Deceased";
            else
                return "";
        }
    },
    methods: {
        GetContent: function ()
        {
            let params = new URLSearchParams(document.location.search.substring(1));
            let id = params.get("id");

            //fetch manta details
            fetch(this.uri + id)
                .then(response => response.json())
                .then(data =>
                {
                    if (data.errors.code === "0")
                    {
                        console.log(data.data[0]);
                        //valid response
                        this.manta = data.data[0];
                        //set title with manta name
                        document.title = this.manta.Name + " - Manta Ray ID Project";
                        this.GetImagePath(this.manta);
                    }

                })
                .catch(error => console.error("Unable to get manta rays.", error));


        },
        GetImagePath: function (mantaray)
        {
            fetch(this.imageURI + mantaray._mantaID, {cache: "no-store"})
                .then(response => response.json())
                .then(data =>
                {
                    if (data.errors.code === "0" && data.data.length > 0)
                    {
                        console.log("images");
                        console.log(data.data);
                        //valid response, set using vue.set to trigger DOM update
                        Vue.set(mantaray, 'images', data.data);
                    }

                })
                .catch(error => console.error("Unable to get manta rays.", error));


        },
        GetSightings: function()
        {
            let params = new URLSearchParams(document.location.search.substring(1));
            let id = params.get("id");
            //fetch manta sightings info
            fetch(this.sightingsURI + id + "&d=" + this.sightingsDate, {cache: "no-store"})
                .then(response => response.json())
                .then(data =>
                {
                     if (data.errors.code === "0")
                     {
                          console.log(data.data);
                          //valid response, sort by start date, most recent first
                          //API always responds ascending, so reverse
                          this.sightings = data.data.reverse();
                     }
                 })
            .catch(error => console.error("Unable to get manta rays.", error));

        },
        plusSlides: function (n)
        {
            this.showSlides(this.slideIndex += n);
        },
        currentSlide: function (n)
        {
            this.showSlides(this.slideIndex = n);
        },
        showSlides: function (n)
        {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) { this.slideIndex = 1 }
            if (n < 1) { this.slideIndex = slides.length }
            for (i = 0; i < slides.length; i++)
            {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++)
            {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[this.slideIndex - 1].style.display = "block";
            dots[this.slideIndex - 1].className += " active";
        }

    },
    created: function ()
    {
        this.GetContent();
    }
});
