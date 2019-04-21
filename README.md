
# mulitcloudApp 智能机柜C端(小程序端)  #

## 一、开发环境安装 ##

### 1、node 环境安装 ###
    地址：https://nodejs.org/zh-cn/
    开发时的版本v10.15.0


### 2、Taro框架安装 ###
    安装地址：https://taro.aotu.io/
    taro-ui地址：https://taro.aotu.io/

### 3、mulitApp接口文档 ###
    地址：http://doc.wemall.com.cn/web/#/13?page_id=338

### 4、小程序图片在腾讯云上 ###
       
	小程序静态文件测试地址	shoptestapp-1253877534.cos.ap-beijing.myqcloud.com	| shopapp.wemall.com.cn
	小程序静态文件地址	shopapp-1253877534.cos.ap-beijing.myqcloud.com   |shoptestapp.wemall.com.cn


### 5、github存储 ###

      https://github.com/sutootototo2002/mulitApp.git

### 6、小程序node.js版本切换工具 ###
    
    nvm版本切换工具:https://github.com/coreybutler/nvm-windows/releases
    node版本查看:https://nodejs.org/zh-cn/download/releases/

    （主要用于小程序云开发平台,如果不是可以忽略）

### 7、云开发需要具备的基础 ###

    1. HTML/CSS Flex布局
    2. js:es5/es6 事件触发
    3. node.js 运行云端的javascript,云唯一支持的语言
    4. Mongodb 非关系型数据库
    

### 8、小程序开发流程--普通 ###


    详细流程图详见 《小程序开发流程1-1.rp》

### 9、小程序开发流程--云开发 ###

    详细流程图详见 《小程序开发流程1-4.rp》

### 10、小程序开发流程--云开发 数据库（mongodb） ###
    
    1、数据类型介绍：String、Number、Object、Array、Bool、GeoPoint、Date、Null

### 11、小程序云开发实例--云开发 ###

    1、连接数据库
      const db = Taro.cloud.database();
    2、在云平台创建数据集 user

    3、添加数据：
	
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

    4、修改数据：
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

    5、删除数据：
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

    6、全部代码
		
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

