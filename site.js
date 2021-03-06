
var app = new Vue({
    el: '#app',
    data: {
        uri: "https://www.mantarays.info/mantaraysapp/v1/manta-server.php?p=2&n=0",
        imageURI: "https://www.mantarays.info/mantaraysapp/v1/photo-server.php?p=",
        imageSrc: "https://www.mantarays.info/mantaraysapp/v1/image-server.php?w=250&f=MantaDatabaseImages/",
        allMantarays: [],
        mantarays: [],
        searchTerm: null,
        mantaDetail: null,
        sexDict: {
            "F": "Female",
            "M": "Male",
            "U": "Unknown"
        },
        speciesDict: {
            "A": "Alfredi (reef)",
            "B": "Birostris (pelagic)"
        },
        filterList: {
            "sex": function (x) { return x },
            "species": function (x) { return x },
            "coloring": function (x) { return x },
            "searchterm": function(x) { return x}
        }

    },
    methods: {
        GetContent: function ()
        {
            fetch(this.uri)
                .then(response => response.json())
                .then(data =>
                {
                    if (data.errors.code === "0")
                    {
                        //valid response
                        this.allMantarays = data.data;
                        this.mantarays = this.allMantarays;
                        this.mantarays.forEach(element => {
                            this.GetImagePath(element);
                        });
                    }

                })
                .catch(error => console.error("Unable to get manta rays.", error));
        },
        GetGridItemClasses: function (mantaray)
        {
            let classes = "thumbnail element-item";

            classes += " " + mantaray.Sex;
            classes += " " + mantaray.Species;

            if (mantaray.BlackMorph == "0")
            {
                classes += " light";
            }
            else
            {
                classes += " dark";
            }
            return classes;
        },

        GetImagePath: function (mantaray)
        {
            fetch(this.imageURI + mantaray.BestVentralPhoto)
            .then(response => response.json())
            .then(data =>
            {
                if (data.errors.code === "0")
                {
                    //valid response, set using vue.set to trigger DOM update
                    Vue.set(mantaray, 'ImagePath', this.imageSrc + data.data[0].Path);                    
                }

            })
            .catch(error => console.error("Unable to get manta rays.", error));
            

        },
        SortByNumber: function ()
        {
            //set new "is checked" value
            $(event.target).siblings(".is-checked").removeClass("is-checked");
            $(event.target).addClass("is-checked");
            this.mantarays.sort(function(a,b) {
              return (a.MPRFWebsiteNumber - b.MPRFWebsiteNumber);
            });
        },
        SortByName: function ()
        {
            //set new "is checked" value
            $(event.target).siblings(".is-checked").removeClass("is-checked");
            $(event.target).addClass("is-checked");
            this.mantarays.sort(function(a,b) {
              if (a.Name < b.Name) {return -1;}
              if (a.Name > b.Name) {return 1;}
              return 0;
            });
        },
        ReverseOrder: function ()
        {
            this.mantarays.reverse();
        },
        UpdateFilters: function (event)
        {
            //set new "is checked" value
            $(event.target).siblings(".is-checked").removeClass("is-checked");
            $(event.target).addClass("is-checked");

            //recalculate what manta rays to display
            // this.mantarays = this.allMantarays.filter(this.filterList["sex"]).filter(this.filterList["species"]).filter(this.filterList["coloring"]);
            this.mantarays = this.allMantarays.filter(this.filterList["sex"]).filter(this.filterList["species"]).filter(this.filterList["coloring"]).filter(this.filterList["searchterm"]);
        },
        FilterBySex: function (sex)
        {
            if (sex == "")
            {
                this.filterList["sex"] = function (x) { return true };
            }
            else
            {
                this.filterList["sex"] = function (x) { return x.Sex == sex };
            }
            this.UpdateFilters(event);
        },
        FilterBySpecies: function (species)
        {
            if (species == "")
            {
                this.filterList["species"] = function (x) { return true };
            }
            else
            {
                this.filterList["species"] = function (x) { return x.Species == species };
            }
            this.UpdateFilters(event);

        },
        FilterByColor: function (color)
        {
            if (color == "")
            {
                this.filterList["coloring"] = function (x) { return true };
            }
            else
            {
                this.filterList["coloring"] = function (x) { return x.BlackMorph == color };
            }
            this.UpdateFilters(event);
        },
        FilterByName: function ()
        {
            const name = this.searchTerm.trim();
            if (name == "")
            {
                this.filterList["searchterm"] = function (x) { return true };
            }
            else
            {
                this.filterList["searchterm"] = function (x) { return x.Name.toLowerCase().includes(name.toLowerCase())};
            }
            this.UpdateFilters(event);
        },
        SetDetail: function(manta){
            console.log("blah")
            this.mantaDetail = manta;
        }

    },
    created: function ()
    {
        this.GetContent();
    }
});
