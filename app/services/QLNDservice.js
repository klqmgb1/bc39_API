function QLNDservice(){
    this.getListQLNDApi = function(){
        return axios({
            url: "https://637b699710a6f23f7fa80a5c.mockapi.io/api/Product",
            method: "GET",
        });
    };
    this.deleteQLNDApi = function(id){
        return axios({
            url: `https://637b699710a6f23f7fa80a5c.mockapi.io/api/Product/${id}`,
            method: "DELETE",
        });
    };
    this.addQLNDApi = function(qlnd){
        return axios({
            url: "https://637b699710a6f23f7fa80a5c.mockapi.io/api/Product",
            method: "POST",
            data: qlnd,
        });
    };
    this.getQLNDApi = function(id){
        return axios({
            url: `https://637b699710a6f23f7fa80a5c.mockapi.io/api/Product/${id}`,
            method: "GET",
        });
    };
    this.updateQLNDApi = function(qlnd){
        return axios({
            url: `https://637b699710a6f23f7fa80a5c.mockapi.io/api/Product/${qlnd.id}`,
            method: "PUT",
            data: qlnd,
        });
    };

}