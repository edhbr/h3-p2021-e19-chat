export const state = () => ({
  messages: [],
  lastMessage: {},
  channel: null,
  sync: null
});

export const mutations = {
  setChannel(state, channel) {
    state.channel = channel;
  },
  clearMessages(state) {
    state.messages = [];
  },
  addMessage(state, { _id, author, date, msg, edited }) {
    if (!_id.includes("_design/") && _id && author && date && msg) {
      const newArr = [...state.messages];

      if (newArr.length && newArr[newArr.length - 1].author === author) {
        newArr[newArr.length - 1].messages[_id] = {
          date,
          msg,
          edited
        };
      } else {
        const messages = {};
        messages[`chat_msg_${_id}`] = { date, msg, edited };

        newArr.push({
          author,
          messages
        });
      }

      state.messages = newArr;
    }
  },
  setSync(state, sync) {
    state.sync = sync;
  }
};

export const actions = {
  async getChannel({ commit }, route = "") {
    try {
      const { data } = await this.$axios.get(
        `/couchproxy/chat_channels/${route}`
      );

      commit("setChannel", data);
      return 200;
    } catch (error) {
      return this.$router.push("/");
    }
  }
};
