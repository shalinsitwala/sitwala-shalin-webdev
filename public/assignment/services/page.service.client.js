(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService)
    
    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        this.createPage = createPage;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;
        
        
        function deletePage(pageId) {
            for(var p in pages){
                if(pages[p]._id === pageId){
                    pages.splice(p,1);
                    break;
                }
            }
            return pages;
        }
        
        function updatePage(pageId, page) {
            for(var p in pages){
                if(pageId === pages[p]._id){
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return pages[p];
                }
            }
            return null;
        }
        
        
        function findPageById(pageId) {
            for(var p in pages){
                if(pages[p]._id === pageId){
                    return angular.copy(pages[p]);
                }
            }
            return null;
            
        }
        
        function findPageByWebsiteId(websiteId) {
            var rpages =[];
            for(var p in pages){
                if(websiteId === pages[p].websiteId){
                    rpages.push(pages[p]);
                }
            }
            return rpages;
        }
        
        
        function createPage(websiteId, page) {
            var newPage = {
                _id: getPageId(),
                name: page.name,
                websiteId: websiteId,
                description: page.description
            };
            pages.push(newPage);
            return newPage;
            
        }

        function getPageId() {
            var date = new Date();

            var components = [
                date.getYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            ];

            var id = components.join("");

            return id;
        }
        
    }
})();