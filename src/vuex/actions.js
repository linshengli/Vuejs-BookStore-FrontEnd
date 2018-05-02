//test
export const increment = ({commit}) => {
    commit('INCREMENT')
};
export const decrement = ({commit}) => {
    commit('DECREMENT')
};
export const change = ({commit}) => {
    commit('CHANGE')
};
export const changenum = ({commit}) => {
    commit('CHANGENUM')
};
export const deleteItem = ({commit}) => {
    commit('DELETEITEM')
};
export const addItem = ({commit},item)=>{
    commit('ADDITEM',item)
};

export const setLanguage = ({commit},language) =>{
    commit('SETLANGUAGE',language)
}