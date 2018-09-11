import I18n from '../util/i18n'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'

class Account extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            accountAddress:'',
            accountEthBalance:0,
            accountTrueBalance:0,
            showAccount:false
        }
        this.handleAddressInput = this.handleAddressInput.bind(this)
    }

    handleAddressInput(e){
        let val =  e.target.value
        if( (val.length ==40) && ( val.indexOf("0x") < 0 ) ){            
            val = "0x"+val
            eth_wallet_js.get_balance(
                {address:val},
                r=>{
                    this.setState({ 
                        showAccount:true, accountAddress:val,
                        accountEthBalance:r.ether 
                    })
            })            
        }
        if( (val.length == 42) && ( val.indexOf("0x") == 0 ) ){
            eth_wallet_js.get_balance(
                {address:val},
                r=>{
                    this.setState({ 
                        showAccount:true, accountAddress:val,
                        accountEthBalance:r.ether 
                    })
            })
        }
    }

    render(){
        const { state,props } = this
        const { t,setLang } = props

        return (
            <div className="account">
                <Card raised={true}>
                    <div className="account-card">
                        {
                            !state.showAccount ?
                            (
                                <TextField
                                    label={'输入账户地址'} 
                                    placeholder={'地址通常为0x开头的42位16进制字符串'} 
                                    fullWidth={true}
                                    type="text"
                                    onChange={this.handleAddressInput}
                                    style={{margin:'35px 0px'}}
                                />
                            ):
                            (
                                <div>
                                    <p>账户信息</p>
                                    <AccountCircleIcon color="primary" style={{fontSize:'80px'}}></AccountCircleIcon>
                                    <p className="account-address">
                                        <span className="meta-text" >账户地址：</span>
                                        <span className="primary-text" >{state.accountAddress}</span>
                                    </p>
                                    <p className="balance">
                                        <span className="meta-text">{t.eth_balance}：</span>
                                        <span className="primary-text">{state.accountEthBalance}</span>
                                        <span className="meta-text">True余额：</span>
                                        <span className="primary-text">{state.accountTrueBalance}</span>
                                    </p>
                                </div>
                            )
                        }                        
                    </div>
                </Card>
                <style jsx>{`
                    .account {
                        display: flex;                
                        flex:auto;
                        flex-direction:column;
                        min-width:300px;
                        max-width:1000px;
                        maigin:20px
                    }
                    .account-card {
                        padding: 20px;
                        text-align:center;
                    }
                    .meta-text {
                        margin: 0px 10px;
                        color:#324057;
                    }
                    .primary-text {
                        color:#00acc1;
                    }
                `}</style>
            </div>
        )
    }
}

export default I18n( Account )