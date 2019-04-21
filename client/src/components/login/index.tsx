import Taro, { Component } from "@tarojs/taro"
import { View, Text, Button,Input,Form } from "@tarojs/components"
import './index.scss';
export default class Login extends Component {
  setData(arg0: { csid: any; }) {
    throw new Error("Method not implemented.");
  }
  state = {
    context: {},
    uname:'suxiaoyan',
    openid:'oIu0D0Xxyx4Su7TLyB-clU5cZ0Ko',
    ceid:'',
    value:'',
    requestresult:''
  }
  data: any;

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        this.setState({
          context: res.result
        })
      })
  }
  //form表单提交的数据
  formSubmit =(e)=>{
   console.log(e);
   console.log(e.detail.value.input);
   let insertdata = e.detail.value.input;
   this.setState({
    value:insertdata
  });
   const db = Taro.cloud.database();
   db.collection('user').add({
     data:{
       username:insertdata
     },
     success:res=>{
       this.setState({
         ceid:res._id
       });
       Taro.showToast({
         title:'插入数据成功！'
       })

       console.log('数据库 新增新数据 成功 记录 _id',res._id);

     },
     fail:err=>{
       Taro.showToast({
         icon:'none',
         title:'新增数据失败!'
       })
     }
   })
  }
  onQuery=()=>{
    console.log('查询数据！');
    const db = Taro.cloud.database();
    db.collection('user').where({
      _openid:this.state.openid
    }).get({
      success:res=>{
        console.log('数据库 查询记录 成功',res.data);
        this.setState({
          requestresult:JSON.stringify(res.data)
        })
      },
      fail:err=>{
        Taro.showToast({
          icon:'none',
          title:'增加记录失败'
        })
        console.log('数据库 查询记录 失败',err);
      }
    })

  }
  onModify=()=>{
    console.log('修改数据！');
    const db = Taro.cloud.database();
    console.log(this.state.ceid)
    db.collection('user').doc(this.state.ceid).update({
      data:{
        username:"000"
      },
      success:res=>{
        this.setState({
          ceid:res._id
        });
        Taro.showToast({
          title:'插入数据成功！'
        })
 
        console.log('数据库 新增新数据 成功 记录 _id',res);
 
      },
      fail:err=>{
        Taro.showToast({
          icon:'none',
          title:'新增数据失败!'
        })
      }
    })
  }
  onDelete=()=>{
    console.log('查询数据！');
    const db = Taro.cloud.database();
    console.log(this.state.ceid)
    db.collection('user').doc(this.state.ceid).remove({
      success:res=>{
        console.log('数据库 删除全部记录 成功',res);
        this.setState({
          requestresult:JSON.stringify(res.data)
        })
      },
      fail:err=>{
        Taro.showToast({
          icon:'none',
          title:'删除记录失败！'
        })
        console.log('数据库 查询记录 失败',err);
      }
    })

  }


  render() {
    return (
      <View className='index'>
      <Form onSubmit={this.formSubmit}>
        <Input type='text' name='input' value={this.state.value} placeholder='将会获取焦点'/>
        <Button type='primary' formType="submit">写入</Button>
        <Button type='primary' onClick={this.onQuery}>查询</Button>
        <Button type='primary' onClick={this.onModify}>修改</Button>
        <Button type='primary' onClick={this.onDelete}>删除</Button>
        </Form>
        <Button open-type="contact">联系客服</Button>
        {/* <Button onClick={this.getLogin}>获取登录云函数</Button> */}
        {/* <Text>context：{JSON.stringify(this.state.context)}</Text> */}
        <View>{this.state.requestresult}</View>
        <View>{this.state.value}</View>
      </View>
    )
  }
}
