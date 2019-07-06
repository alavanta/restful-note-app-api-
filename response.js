'use strict'

exports.ok=function(values,res){
    const data={
        status:200,
        values:values,
    };
    res.json(data);
    res.end();

}

exports.pagination=function(totalData, page, totalPage,limit,values,res,search,category){
    const data={
        status:200,
        data:values,
        totalData:totalData,
        page:page,
        totalPage:totalPage,
        limit:limit,
        search:search,
        selectedCategory:category
    };
    res.json(data);
    res.end();

}