
        var production_url = "https://updown.io/api/checks?api-key=ro-pz3x1zy4ae63yhygraqe";
        var development_url = "https://gist.githubusercontent.com/Rio517/c523873cd4495456a88cac8f1860461b/raw/13f388a8cc6ca73d6f2680606c85b1420829fd9a/sample.json"
        var url = development_url;

        var despcription = {
            "hs1x": "push messages/device pings",
            "m06d": "log-in system",
            "ccvy": "backend and order processing",
            "fgbi": "workflows",
            "c1xk": "Statistics and error reporting"
        };

        $(document).ready(function() {
            getDataFromServer();
        });

        function update(){
            var value = $("#environment_dropdown option:selected").val();
            
            if(value == "production")
                getProductionData();
            else
                getDevelopmentData();
        }

        function getProductionData(){
            url = production_url;
            getDataFromServer(); 
        }

        function getDevelopmentData(){
            url = development_url;
            getDataFromServer();
        }


        function getDataFromServer() {
            $.getJSON(url, function(data) {
                createhtml(data);
            })
        }

        var access;
        var compiled;

        function createhtml(api_data) {
            
            if(typeof access == 'undefined'){
                access = document.getElementById("link_template").innerHTML;
                compiled = Handlebars.compile(access);
            }
            
            var generatedhtml = compiled(api_data);
            var table_container = document.getElementById("container");
            table_container.innerHTML = generatedhtml;
        }

        Handlebars.registerHelper("populateDescription", function(token) {
            return despcription[token];
        });

        Handlebars.registerHelper("prettifyDate", function(down_since) {
            return moment(down_since).format("YYYY-MM-DD HH:mm");
        });


    