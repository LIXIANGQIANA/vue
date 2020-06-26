const app={
    namespaced:true,
    state: {
        isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false,
        isCollapses:JSON.parse(sessionStorage.getItem('isCollapses')) || false
      },
      getters:{},
      mutations: {
        SET_COLLAPSE:(state)=>{
          state.isCollapse=!state.isCollapse
          sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
        },
        SET_COLLAPSES:(state)=>{
          state.isCollapses=!state.isCollapses
          sessionStorage.setItem('isCollapses',JSON.stringify(state.isCollapses))
        }
        
      },
      actions: {}
}
export default app