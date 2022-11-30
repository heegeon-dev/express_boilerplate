module.exports = {
    Pagination : (page , list, postperPage) => {
        //page : page번호
        //list : result list
        // postperPage : 페이지당 post 수

        // list = list.map(el => el.get({ plain: true }));

        let data = {};
        let listbyPaging = {};

        let maxPage = Math.ceil(list.length/postperPage);
        let maxPost = list.length;

        for(let index = page * postperPage; index < (page+1) * postperPage && index < maxPost ; index++ ){
            list[index].postNum = index;
            listbyPaging[index - (page * postperPage)] = list[index]; 
        }
        
        data.maxPage = maxPage; //maxPage : 마지막 페이지
        data.maxPost = maxPost; //maxPost : 마지막 포스트
        data.list = listbyPaging;   //list : 해당 페이지 리스트
        return data;        

    }
}