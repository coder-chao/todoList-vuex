import Vue from 'vue'
import Vuex, { Store } from 'vuex'
//导入axios
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      list:[],
      //文本框的值
      inputVal:'aaa',
      nextId:5,
      viewKey:'all'
  },
  mutations: {
      initList(state,list){
        state.list = list
      },
      setInputValue(state,value){
          state.inputVal = value
      },
      addItem(state){
          const obj = {
              id:state.nextId,
              info:state.inputVal.trim(),
              done:false
          }
          state.list.push(obj)
          state.nextId++
          state.inputVal=''
      },
      removeItem(state,id){
          const i = state.list.findIndex(item => item.id == id)
          console.log(i);
          if(i != -1){
              state.list.splice(i,1)
          }
      },
      changeStatus(state,param){
          const i = state.list.findIndex(item => item.id == param.id)
          if(i != -1){
              state.list[i].done = param.status
          }
      },
      cleanDone(state){
          state.list = state.list.filter(item => item.done == false)
      },
      changeViewKey(state,key){
          state.viewKey = key
      }
  },
  actions: {
      getList(context){
          axios.get('/list.json').then(({data}) => {
              context.commit('initList',data)
          })
      }
  },
  getters:{
      unDoneLength(state){
          return state.list.filter(item => item.done == false).length
      },
      infoList(state){
          if(state.viewKey == 'all'){
              return state.list
          }
          if(state.viewKey == 'undone'){
            return state.list.filter(item => item.done == false)
        }
        if(state.viewKey == 'done'){
            return state.list.filter(item => item.done == true)
        }
        return state.list
      }
  }
})
