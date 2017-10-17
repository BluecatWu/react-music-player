import React from 'react';
import Header from './components/header';
import Player from './player/player';
import  {MUSIC_LIST}  from './config/musiclist';
import Musiclist from './player/musiclist';
import Pubsub from 'pubsub-js'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

class App extends React.Component{
    constructor(props) {
        super(props);
        // console.log(this.props)
        this.state = {
            musiclist : MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        };
    }
    playMusic(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3 : musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem:musicItem
        })
    }
    playNext(type= 'next'){
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex=null;
        let length=this.state.musiclist.length;
        if(type==='next'){
            newIndex=(index+1)%length;
        }else{
            newIndex=(index-1+length)%length;
        }
        this.playMusic(this.state.musiclist[newIndex])
    }
    findMusicIndex(musicItem){
        return  this.state.musiclist.indexOf(musicItem);
    }
    componentDidMount(){
        $('#player').jPlayer({
            supplied : 'mp3',
            wmode : 'window'
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended,(e)=>{
            this.playNext();
        })

        Pubsub.subscribe('DELETE_MUSIC' , (msg , musicItem) =>{
            if(this.state.currentMusicItem === musicItem){
                this.playNext('next');
            }
            this.setState({
                musiclist : this.state.musiclist.filter(item=>{
                    return item !== musicItem
                })
            });
        } )

        Pubsub.subscribe('PLAY_MUSIC' , (msg , musicItem) =>{
            this.playMusic(musicItem)
        } )
        Pubsub.subscribe('PLAY_PREV' , (msg ) =>{
            this.playNext('prev')
        } )
        Pubsub.subscribe('PLAY_NEXT' , (msg) =>{
            this.playNext('next')
        } )
    }
    componentWillUnMount(){
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        $('#player').unbind($.jPlayer.event.ended)
    }
    render(){
        console.log(this.state);
        return (
            <div>
                <Header />
                <Route path='/' component={Player} />
                <Route path='/list' component={Musiclist} />
            </div>
        )
    }
}

class Root extends React.Component {
    render(){
        return (
            <Router >
                <Route path='/' component={App}>

                </Route>
            </Router>
        )
    }
}

export default Root;