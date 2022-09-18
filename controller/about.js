export const renderAboutPage = (req, res)=>{
try{
    res.render('about')
}
catch(err){
res.render('error', { message: 'Server is down. Please try again later' })
}
}