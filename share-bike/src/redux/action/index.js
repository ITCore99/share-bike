/**action导出的是一个对象*/
export default {
    changeMenu(text)
    {
        return{
            type:"CHANGE_MENU_TITLE",
            text,
        }
    }
}