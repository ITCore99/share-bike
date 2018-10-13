/**reducer*/
let initState={
    menuItemTitle:"首页"
}

export default function(state=initState,action)
{
    switch (action.type)
    {
        case "CHANGE_MENU_TITLE":
            return{
                ...initState,
                menuItemTitle:action.text,
            };
        default:
            return state;

    }
}