
var app = new Vue({
    el: '#app',
    data: {
        uri: "https://www.mantarays.info/mantaraysapp/vtest/manta-server.php?p=2&m=",
        imageURI: "https://www.mantarays.info/mantaraysapp/vtest/photo-server.php?p=",
        manta: {},
        sexDict: {
            "F": "Female",
            "M": "Male",
            "U": "Unknown"
        },
        speciesDict: {
            "A": "Alfredi (reef)",
            "B": "Birostris (pelagic)"
        },

    },
    methods: {
        GetContent: function ()
        {
            let params = new URLSearchParams(document.location.search.substring(1));
            let id = params.get("id");
            console.log(id);
            fetch(this.uri + id)
                .then(response => response.json())
                .then(data =>
                {
                    if (data.errors.code === "0")
                    {
                        console.log(data.data[0]);
                        //valid response
                        this.manta = data.data[0];
                        console.log(this.manta);
                        this.GetImagePath(this.manta);
                    }

                })
                .catch(error => console.error("Unable to get manta rays.", error));
        },
        GetImagePath: function (mantaray)
        {
            fetch(this.imageURI + mantaray.BestVentralPhoto)
            .then(response => response.json())
            .then(data =>
            {
                if (data.errors.code === "0" && data.data.length > 0)
                {
                    //valid response, set using vue.set to trigger DOM update
                    Vue.set(mantaray, 'ImagePath', "https://www.mantarays.info/MantaDatabaseImages/" + data.data[0].Path);
                    Vue.set(mantaray, "ImageCredit", data.data[0].PhotoCredit);
                    
                }

            })
            .catch(error => console.error("Unable to get manta rays.", error));
            

        }

    },
    created: function ()
    {
        this.GetContent();
    }
});
