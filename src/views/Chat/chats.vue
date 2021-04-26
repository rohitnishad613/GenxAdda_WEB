<template>
  <v-container fill-height style="position: relative;" class="py-0">
    <v-row
      align="center"
      justify="space-between"
      class="ma-0 px-2 user_info_box"
    >
      <v-row class="ma-0 user" :to="`/${Auser._id}`">
        <router-link :to="`/${Auser._id}`">
          <ProfileAvatar
              :status="Auser.status"
          
            class="mr-3"
            :size="55"
            :profilePic="Auser.profilePic"
          ></ProfileAvatar>
        </router-link>
        <router-link :to="`/${Auser._id}`">
          <v-list-item-content>
            <v-list-item-title
              >{{ Auser.fname }} {{ Auser.lname }}</v-list-item-title
            >
            <v-card-subtitle class="ma-0 pa-0">{{
              Auser.status
            }}</v-card-subtitle>
          </v-list-item-content>
        </router-link>
      </v-row>
      <div class="more_ops">
        <v-menu offset-y style="z-index:1;">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" icon rounded>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title @click="deleteAllmsg()"
                >Delete All</v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="block()">Block</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-row>

    <div class="dialogs">
      <v-dialog v-model="dialog_recived_msg" width="300px">
        <v-card>
          <v-container>
            <v-btn
              @click="replyMsg(selected_msg), (dialog_recived_msg = false)"
              text
              >Reply</v-btn
            >
          </v-container>
          <v-container>
            <v-btn
              @click="
                DeleteMsgForReciver(selected_msg._id, i - 1),
                  (dialog_recived_msg = false)
              "
              text
              >Delete for me</v-btn
            >
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_deleted_msg_reciver" width="300px">
        <v-card>
          <v-container>
            <v-btn
              @click="
                DeleteMsgForReciver(selected_msg._id, i - 1),
                  (dialog_deleted_msg_reciver = false)
              "
              text
              >Delete for me</v-btn
            >
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_sended_msg" width="300px">
        <v-card>
          <v-container>
            <v-btn
              @click="
                DeleteMsgForSender(selected_msg._id, i - 1),
                  (dialog_sended_msg = false)
              "
              text
              >Delete for me</v-btn
            >
          </v-container>
          <v-container>
            <v-btn
              @click="
                DeleteMsgForEveryone(selected_msg._id, i - 1),
                  (dialog_sended_msg = false)
              "
              text
              >Delete for everywhere</v-btn
            >
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_deleted_msg_sender" width="300px">
        <v-card>
          <v-container>
            <v-btn
              @click="
                DeleteMsgForSender(selected_msg._id, i - 1),
                  (dialog_deleted_msg_sender = false)
              "
              text
              >Delete for me</v-btn
            >
          </v-container>
        </v-card>
      </v-dialog>
    </div>

    <div @scroll="handleScrollBar()" id="scroll-box" class="autoScroll">
      <div v-for="i in messages.length" :key="i">
        <div v-if="messages[i - 1].sender_id != user._id">
          <div
            v-if="
              messages[i - 1].delete_for_everyone != true &&
                messages[i - 1].delete_for_reciver != true
            "
          >
            <v-container>
              <v-row justify="start">
                <div
                  @click="open_dialog_recived_msg(messages[i - 1])"
                  style="max-width:65%;"
                  class="msg"
                >
                  <div class="nonMsg" v-if="messages[i - 1].replyOf">
                    <p
                      v-if="messages[i - 1].replyOf.msg"
                      class="pa-1 mb-1 RelpyOf"
                    >
                      {{ messages[i - 1].replyOf.msg }}
                    </p>
                    <v-img v-else-if="messages[i - 1].replyOf.photo" :src="`${$API_url}/${messages[i - 1].replyOf.photo}`" width="100%">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular
                            indeterminate
                            color="gray"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <VideoPlayer
                      v-else-if="messages[i - 1].replyOf.video"
                      :controller="true"
                      :src="`${$API_url}/${messages[i - 1].replyOf.video}`"
                    ></VideoPlayer>
                    <v-row v-else-if="messages[i - 1].replyOf.other_file">
                      {{messages[i - 1].replyOf.other_file}}
                      <v-btn icon>
                        <v-icon>mdi-download</v-icon>
                      </v-btn>
                    </v-row>
                  </div>
                    <span v-if="messages[i - 1].msg">{{ messages[i - 1].msg }}</span>
                    <v-img v-else-if="messages[i - 1].photo" :src="`${$API_url}/${messages[i - 1].photo}`" width="100%">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular
                            indeterminate
                            color="gray"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <VideoPlayer
                      v-else-if="messages[i - 1].video"
                      :controller="true"
                      :src="`${$API_url}/${messages[i - 1].video}`"
                    ></VideoPlayer>
                    <v-row v-else-if="messages[i - 1].other_file">
                      {{messages[i - 1].other_file}}
                      <v-btn icon>
                        <v-icon>mdi-download</v-icon>
                      </v-btn>
                    </v-row>
                </div>
              </v-row>
            </v-container>
          </div>

          <div v-else-if="messages[i - 1].delete_for_reciver != true">
            <v-container>
              <v-row justify="start">
                <div
                  @click="open_dialog_deleted_msg_reciver(messages[i - 1])"
                  style="max-width:65%;"
                  class="msg nonMsg"
                >
                  <span>Message is delete for everyone</span>
                </div>
              </v-row>
            </v-container>
          </div>
        </div>

        <div v-if="messages[i - 1].sender_id == user._id">
          <div
            v-if="
              messages[i - 1].delete_for_everyone != true &&
                messages[i - 1].delete_for_sender != true
            "
          >
            <v-container>
              <v-row justify="end">
                <div
                  @click="open_dialog_sended_msg(messages[i - 1])"
                  style="max-width:65%;"
                  class="msg"
                >
                  <div class="nonMsg" v-if="messages[i - 1].replyOf">
                    <p
                      v-if="messages[i - 1].replyOf.msg"
                      class="pa-1 mb-1 RelpyOf"
                    >
                      {{ messages[i - 1].replyOf.msg }}
                    </p>
                    <v-img v-else-if="messages[i - 1].replyOf.photo" :src="`${$API_url}/${messages[i - 1].replyOf.photo}`" width="100%">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular
                            indeterminate
                            color="gray"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <VideoPlayer
                      v-else-if="messages[i - 1].replyOf.video"
                      :controller="true"
                      :src="`${$API_url}/${messages[i - 1].replyOf.video}`"
                    ></VideoPlayer>
                    <v-row v-else-if="messages[i - 1].replyOf.other_file">
                      {{messages[i - 1].replyOf.other_file}}
                      <v-btn icon>
                        <v-icon>mdi-download</v-icon>
                      </v-btn>
                    </v-row>
                  </div>
                  <span v-if="messages[i - 1].msg">{{ messages[i - 1].msg }}</span>
                  <v-img v-else-if="messages[i - 1].photo" :src="`${$API_url}/${messages[i - 1].photo}`" width="100%">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular
                          indeterminate
                          color="gray"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <VideoPlayer
                    v-else-if="messages[i - 1].video"
                    :controller="true"
                    :src="`${$API_url}/${messages[i - 1].video}`"
                  ></VideoPlayer>
                  <v-row v-else-if="messages[i - 1].other_file">
                    {{messages[i - 1].other_file}}
                    <v-btn icon>
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-row>
                </div>
                <div style="display: grid; align-items: end;">
                  <v-icon color="primary" v-if="messages[i - 1].seen" small
                    >mdi-check-all</v-icon
                  >
                  <v-icon color="primary" v-else small>mdi-check</v-icon>
                </div>
              </v-row>
            </v-container>
          </div>
          <div v-else-if="messages[i - 1].delete_for_sender != true">
            <v-container>
              <v-row justify="end">
                <div
                  @click="open_dialog_deleted_msg_sender(messages[i - 1])"
                  style="max-width:65%;"
                  class="msg nonMsg"
                >
                  <span>Message is delete for everyone</span>
                </div>
              </v-row>
            </v-container>
          </div>
        </div>
      </div>
    </div>

    <div class="px-2 write_msg_box">
      <v-row v-if="send_attachments" class="pa-2 ma-1">
        <v-card class="ma-0 pa-3" style="width:100%; border-radius: 10px;">
          <div class="my-1 photo">
            <v-btn class="mx-2" fab dark color="purple">
              <v-icon dark>mdi-image</v-icon>
            </v-btn>
            <label for="photo">
              Select
            </label>
            <input
              class="hide_file_input"
              type="file"
              accept=".jpg, .png, .jpeg"
              name="photo"
              ref="photo"
              @change="selectPhoto()"
              id="photo"
            />
          </div>
          <div class="my-1 video">
            <v-btn class="mx-2" fab dark color="orange">
              <v-icon dark>mdi-video</v-icon>
            </v-btn>
            <label for="video">
              Select
            </label>
            <input
              class="hide_file_input"
              type="file"
              accept=".mp4, .mkv, .mov"
              name="video"
              ref="video"
              @change="selectVideo()"
              id="video"
            />
          </div>
          <div class="my-1 other_file">
            <v-btn class="mx-2" fab dark color="green">
              <v-icon dark>mdi-file-question-outline</v-icon>
            </v-btn>
            <label for="other_file">
              Select
            </label>
            <input
              class="hide_file_input"
              type="file"
              name="other_file"
              ref="other_file"
              @change="select_other_file()"
              id="other_file"
            />
          </div>
        </v-card>
      </v-row>
      <v-row v-if="repliedMsg._id" align="center" justify="space-between" class="pa-2 ma-0 previewMsgRelpy">
        <v-chip style="height:auto; white-space: normal; max-width:65%;">
          <span v-if="repliedMsg.msg">{{ repliedMsg.msg }}</span>
          <v-img v-else-if="repliedMsg.photo" :src="`${$API_url}/${repliedMsg.photo}`" width="30%">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="gray"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <VideoPlayer
            v-else-if="repliedMsg.video"
            :controller="true"
            :src="`${$API_url}/${repliedMsg.video}`"
          ></VideoPlayer>
          <div v-else-if="repliedMsg.other_file">
            {{repliedMsg.other_file}}
          </div>
        </v-chip>
        <v-btn x-small @click="repliedMsg = {}" icon>
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-row class="ma-0" align="center" justify="space-around">
        <v-text-field
          v-model="message"
          label="Massage"
          clearable
          class="px-1"
        ></v-text-field>
        <v-btn @click="send_attachments = !send_attachments" icon rounded>
          <v-icon>mdi-link</v-icon>
        </v-btn>

        <v-btn
          @click="repliedMsg._id ? sendreplyMsg() : sendMsg()"
          icon
          color="primary"
          rounded
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-row>
    </div>

    <v-card-subtitle v-if="invalid_user" class="text-center pa-5"
      >Invalid User</v-card-subtitle
    >
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import io from "socket.io-client";
export default {
  computed: mapGetters(["user", "Auser"]),
  data() {
    return {
      dialog_deleted_msg_reciver: false,
      dialog_recived_msg: false,
      dialog_sended_msg: false,
      dialog_deleted_msg_sender: false,
      selected_msg: null,
      message: "",
      messages: [],
      repliedMsg: {},
      invalid_user: false,
      send_attachments: false,
      selected_other_file: null,
      selected_video: null,
      selected_photo: null,
    };
  },
  methods: {
    ...mapActions(["getUser", "getProfile", "blockuser"]),
    open_dialog_deleted_msg_reciver(msg) {
      this.dialog_deleted_msg_reciver = true;
      this.selected_msg = msg;
    },
    open_dialog_recived_msg(msg) {
      this.dialog_recived_msg = true;
      this.selected_msg = msg;
    },
    open_dialog_sended_msg(msg) {
      this.dialog_sended_msg = true;
      this.selected_msg = msg;
    },
    open_dialog_deleted_msg_sender(msg) {
      this.dialog_deleted_msg_sender = true;
      this.selected_msg = msg;
    },
    selectPhoto() {
      this.selected_video = null;
      this.selected_other_file = null;
      this.audio_msg = null;
      this.send_attachments = false;
      this.selected_photo = this.$refs.photo.files[0];
    },
    selectVideo() {
      this.selected_photo = null;
      this.selected_other_file = null;
      this.audio_msg = null;
      this.selected_video = this.$refs.video.files[0];
      this.send_attachments = false;
    },
    select_other_file() {
      this.selected_photo = null;
      this.selected_video = null;
      this.audio_msg = null;
      this.selected_other_file = this.$refs.other_file.files[0];
      this.send_attachments = false;
    },
    handleScrollBar(){
        if(this.messages.length != 0 && this.messages.length % 10 == 0 && document.getElementById("scroll-box").scrollTop == 0){
          this.getmoreoldchats()
        }
    },
    getChats(dateTime){
      let socket = io(`${this.$API_url}/chat`, {
        query: `token=${localStorage.getItem("token")}`,
      });
      // new Date().toISOString()
      socket.on("chats", (data) => {
        let dataLen = data.length;
        for (let i = 0; i < dataLen; i++) {
          this.messages.unshift(data[i]);
          if (data[i].receiver_id == this.user._id && !data[i].seen) {
            socket.emit("readchat", {
              chatid: data[i]._id,
              userid: data[i].sender_id,
            });
            data[i].seen = true;
          }
        }
      });
      socket.emit("chats", {
        sender_id: this.user._id,
        receiver_id: this.$route.params.receiver_id,
        date: dateTime
      });
      return
    },
    getmoreoldchats(){
      let dateTime = this.messages[0].send_at
      this.getChats(dateTime)
    },
    handlegetChats(dateTime) {
      let socket = io(`${this.$API_url}/chat`, {
        query: `token=${localStorage.getItem("token")}`,
      });
      this.getChats(new Date().toISOString())
      socket.on("newchats", (data) => {
        let dataLen = data.length;
        for (let i = 0; i < dataLen; i++) {
          this.messages.push(data[i]);
          if (data[i].receiver_id == this.user._id && !data[i].seen) {
            socket.emit("readchat", {
              chatid: data[i]._id,
              userid: data[i].sender_id,
            });
            data[i].seen = true;
          }
        }
      });

      socket.on("chat_is_seen", (chatid) => {
        let messagesLen = this.messages.length;
        for (var i = 0; i < messagesLen; i += 1) {
          if (this.messages[i]._id == chatid) {
            this.messages[i].seen = true;
          }
        }
      });
    },
    sendMsg() {
      let socket = io(`${this.$API_url}/chat`, {
        query: `token=${localStorage.getItem("token")}`,
      });
      let data = {
        sender_id: this.user._id,
        receiver_id: this.$route.params.receiver_id,
      };
      if (this.message) {
        data.msg = this.message;
      } else if (this.selected_video) {
        data.video = {};
        data.video.original_name_type = this.selected_video.name;
        let reader = new FileReader();
        reader.readAsArrayBuffer(this.selected_video);
        data.video.arr_buff = this.selected_video;
      } else if (this.selected_photo) {
        data.photo = {};
        data.photo.original_name_type = this.selected_photo.name;
        const reader = new FileReader();
        reader.readAsArrayBuffer(this.selected_photo);
        data.photo.arr_buff = this.selected_photo;
      } else if (this.audio_msg) {
        data.audio = {};
        data.audio.original_name_type = this.audio_msg.name;
        let reader = new FileReader();
        reader.readAsArrayBuffer(this.audio_msg);
        data.audio.arr_buff = this.audio_msg;
      } else if (this.selected_other_file) {
        data.other_file = {};
        data.other_file.original_name_type = this.selected_other_file.name;
        let reader = new FileReader();
        reader.readAsArrayBuffer(this.selected_other_file);
        data.other_file.arr_buff = this.selected_other_file;
      }
      socket.emit("sendMsg", data);
      this.message = "";
      this.selected_photo = null;
      this.selected_video = null;
      this.selected_other_file = null;
    },
    replyMsg(replied_msg) {
      this.repliedMsg = {
        _id: replied_msg._id,
        sender_id: replied_msg.sender_id,
        receiver_id: replied_msg.receiver_id,
        msg: replied_msg.msg,
        video: replied_msg.video,
        photo: replied_msg.photo,
        other_file: replied_msg.other_file,
      };
    },
    sendreplyMsg() {
      let socket = io(`${this.$API_url}/chat`, {
        query: `token=${localStorage.getItem("token")}`,
      });

      if (this.repliedMsg._id != "") {
        let socket = io(`${this.$API_url}/chat`, {
          query: `token=${localStorage.getItem("token")}`,
        });
        let data = {
          sender_id: this.user._id,
          receiver_id: this.$route.params.receiver_id,
          replyOf: this.repliedMsg,
        };
        if (this.message) {
          data.msg = this.message;
        }
        if (this.selected_video) {
          data.video = {};
          data.video.original_name_type = this.selected_video.name;
          let reader = new FileReader();
          reader.readAsArrayBuffer(this.selected_video);
          data.video.arr_buff = this.selected_video;
        } else if (this.selected_photo) {
          data.photo = {};
          data.photo.original_name_type = this.selected_photo.name;
          const reader = new FileReader();
          reader.readAsArrayBuffer(this.selected_photo);
          data.photo.arr_buff = this.selected_photo;
        } else if (this.audio_msg) {
          data.audio = {};
          data.audio.original_name_type = this.audio_msg.name;
          let reader = new FileReader();
          reader.readAsArrayBuffer(this.audio_msg);
          data.audio.arr_buff = this.audio_msg;
        } else if (this.selected_other_file) {
          data.other_file = {};
          data.other_file.original_name_type = this.selected_other_file.name;
          let reader = new FileReader();
          reader.readAsArrayBuffer(this.selected_other_file);
          data.other_file.arr_buff = this.selected_other_file;
        }
        socket.emit("sendMsgReply", data);
        this.message = "";
        this.selected_photo = null;
        this.selected_video = null;
        this.selected_other_file = null;
        this.repliedMsg = {};
      }
    },
    DeleteMsgForSender(msgId, msgindex) {
      let socket = io(`${this.$API_url}/chat`, {
        query: `token=${localStorage.getItem("token")}`,
      });
      socket.emit("DeleteMsgForSender", msgId);
      this.messages[msgindex].delete_for_sender = true;
    },
    DeleteMsgForReciver(msgId, msgindex) {
      let socket = io(`${this.$API_url}/chat`, {
        query: `token=${localStorage.getItem("token")}`,
      });
      socket.emit("DeleteMsgForReciver", msgId);
      this.messages[msgindex].delete_for_reciver = true;
    },
    DeleteMsgForEveryone(msgId, msgindex) {
      let socket = io(`${this.$API_url}/chat`, {
        query: `token=${localStorage.getItem("token")}`,
      });
      socket.emit("DeleteForEveryone", {
        msgId: msgId,
        msgindex: msgindex,
      });
    },
    deleteAllmsg() {
      let socket = io(`${this.$API_url}/chat`, {
        query: `token=${localStorage.getItem("token")}`,
      });
      socket.emit("DeleteAllmsg", {
        Auserid: this.Auser._id,
      });
    },
    block() {
      this.blockuser(this.Auser._id);
      this.user.blocked_users.push(this.Auser._id);
      this.$router.push("/chats");
    },
    handulDeleteForEveryone() {
      let socket = io(`${this.$API_url}/chat`, {
        query: `token=${localStorage.getItem("token")}`,
      });
      socket.on("DeleteForEveryone", (data) => {
        if (data.msgindex && this.messages[data.msgindex]._id == data.msgId) {
          this.messages[data.msgindex].delete_for_everyone = true;
        }
      });
    },
  },
  async created() {
    await this.getProfile();
    if (this.user.friends.indexOf(this.$route.params.receiver_id) != -1) {
      this.handlegetChats();
      this.handulDeleteForEveryone();
      await this.getUser(this.$route.params.receiver_id);
    } else {
      this.invalid_user = true;
    }
    document.title = `${this.Auser.fname} ${this.Auser.lname}  - GenxAdda`;
  },
  mounted() {
    console.clear();
  },
  updated(){  
  var elem = document.getElementById("scroll-box");
  elem.scrollTop = elem.clientHeight;
},
};
</script>

<style>
.write_msg_box {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.user_info_box {
  position: absolute;
  top: 5px;
  left: 0;
  right: 0;
}
.autoScroll {
  height: calc(100vh - 200px);
  overflow: scroll;
  background: rgba(151, 151, 151, 0.08);
  border-radius: 10px;
  padding: 0px 10px;
  position: absolute;
  left: 0;
  right: 0;
}
.previewMsgRelpy {
  border-radius: 10px 10px 0px 00px;
  border: 1px solid rgba(58, 58, 58, 0.199);
  background: rgba(124, 124, 124, 0.452);
}

.RelpyOf {
  background: rgba(19, 19, 19, 0.26);
  border-radius: 7px;
}

.msg {
  border-radius: 10px;
  background: rgba(105, 105, 105, 0.123);
  padding: 7px;
}
.nonMsg {
  opacity: 0.5;
}
</style>
