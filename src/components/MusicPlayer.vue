<template>
  <b-container fluid="sm">
    <b-row>
      <b-col>
        <h3>{{title(currentSong.filename)}}</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2">
        <b-row>
          <b-col>
            <b-button class="mb-3" @click="playPrev">PREV</b-button>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-button class="mb-3" @click="handleVolDown">Vol-</b-button>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-button  class="mb-3" @click="togglePlay">
              <span v-if="playing">Pause</span>
              <span v-else>Play</span>
            </b-button>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-button  class="mb-3" @click="toggleBrightness">
              <span v-if="day">Night</span>
              <span v-else>Day</span>
            </b-button>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="8">

    <b-list-group>
      <b-list-group-item v-for="(song,index) in songs" v-bind:key="song.filename">
        <span v-if="isPlaying(song.filename)">playing..</span>
        <span>
          <a @click="handleGoto(index)">{{title(song.filename)}}</a>
        </span>
      </b-list-group-item>
    </b-list-group>
      </b-col>

      <b-col>
        <b-row>
          <b-col>
            <b-button class="mb-5" @click="playNext">NEXT</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button class="mb-5" @click="handleVolUp">Vol+</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mb-5">
            <b-button @click="cls">Close</b-button>
          </b-col>
        </b-row>        
      </b-col>
    </b-row>
    <audio controls autoplay ref="player" style="display: none;" @ended="playNext" @play="onPlay">
      <source src="">
    </audio>
  </b-container>
</template>

<script>
import * as caller from '@/services/caller'
export default {
  name: "MusicPlayer",
  mounted(){
    this.loadInfo()
  },
  data: function(){
    return {
      songs: window.songs,
      currentSong: window.currentSong,
      played: false,
      audioDisp: 'block',
      paused: true,
      playing: false,
      songIndex: 0,
      volume: 1.0,
      day: true
    }
  },
  methods: {
    onPlay(){
      if (!this.played){
        this.played = true        
        this.audioDisp = "none"
      }      
    },
    title(filename){

      let paths = filename.split("/")
      return paths[paths.length-1]
    },
    handleGoto(index){
      this.songIndex = index
      let player = this.$refs.player      
      player.src = "http://localhost:3333/player/open_file?file=" + this.songs[this.songIndex].filename
      player.play()
      this.currentSong.filename = this.songs[this.songIndex].filename
      this.playing = true
    },
    async loadInfo(){      
      let list = await caller.loadMusicFolder()
      if (list.status == 'ok'){        
        window.songs.splice(0, window.songs.length)          
        for (let i=0;i<list.songs.length;i++){
            window.songs.push(list.songs[i])
            if (i == 0){
              this.currentSong.filename = list.songs[i].filename
              let player = this.$refs.player
              console.log(player.src)                            
              player.src = "http://localhost:3333/player/open_file?file=" + this.songs[i].filename
            }         
        }
      }      
    },
    isPlaying(title){
      if (title.startsWith(this.currentSong.filename)){
        return true
      }
      return false
    },
    handleStatus(){
      setTimeout(async function(){
        let status = await caller.status()      
        window.currentSong.filename = status.filename
      }, 1000)      
    },
    handleNext(){      
      caller.nextSong().then(response => {
        this.handleStatus()
      })      
    },
    async handlePrev(){
      await caller.prevSong()
      await this.handleStatus()
    },
    async handleVolUp(){
      if (this.volume >= 1.0){
        this.volume = 1.0
      }else{
        this.volume = this.volume + 0.1
      }
      let player = this.$refs.player      
      player.volume = this.volume
    },
    async handleVolDown(){
      if (this.volume <= 0.0){
        this.volume = 0.0
      }else{
        this.volume = this.volume - 0.1
      }
      let player = this.$refs.player      
      player.volume = this.volume
    },
    cls(){
      window.close()
    },
    playNext(){
      if (this.songIndex == (this.songs.length-1)){
        this.songIndex = 0
      }else{
        this.songIndex++
      }      
      let player = this.$refs.player      

      player.src = "http://localhost:3333/player/open_file?file=" + this.songs[this.songIndex].filename
      player.play()
      this.currentSong.filename = this.songs[this.songIndex].filename
      this.playing = true
    },
    playPrev(){
      if (this.songIndex == 0){
        this.songIndex = this.songs.length - 1
      }else{
        this.songIndex--
      }      
      let player = this.$refs.player
      console.log(player.src)

      player.src = "http://localhost:3333/player/open_file?file=" + this.songs[this.songIndex].filename
      player.play()
      this.currentSong.filename = this.songs[this.songIndex].filename
      this.playing = true
    },    
    pause(){
      let player = this.$refs.player
      player.pause()
    },
    play(){
      let player = this.$refs.player
      player.play()
    },
    togglePlay(){      
      if (this.playing){
        this.playing = false
        let player = this.$refs.player
        player.pause()
      }else{
        this.playing = true
        let player = this.$refs.player
        player.play()
      }
    },
    toggleBrightness(){
      if (this.day){
        this.day = false
        caller.brightness(128)
      }else{
        this.day = true
        caller.brightness(255)
      }
    }
  }
}
</script>

<style>
.list-group{
    max-height: 250px;
    margin-bottom: 10px;
    overflow:scroll;
    -webkit-overflow-scrolling: touch;
}
</style>