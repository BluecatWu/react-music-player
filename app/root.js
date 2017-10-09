import React from 'react'
import Header from './components/header'
import Progress from './components/progress'
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            progress: "-",
            musiclist : '',
            currentMusicItem: '',
            isPlay:null
        };
    }
    componentDidMount(){
        $('#player').jPlayer({
            supplied : 'mp3',
            wmode : 'window'
        });
    }
    render(){
        return (
            <div>
                <Header />
                <Progress
                    progress="1"
                >
                </Progress>
            </div>
        )
    }

}

export default App