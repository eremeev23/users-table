import axios from "axios";
import _ from "lodash";
// import { debouncer } from "@/utils/debouncer";

export const api = {
  state: {
    data: null,
    length: null,
    allData: null,
    currentData: null
  },

  actions: {
    async API_REQUEST({ state }, page = 0) {
      await axios
        .get("/api.json")
        .then(({ data }) => {
          state.allData = data.results;
          state.currentData = _.chunk(data.results, 20);
          state.data = _.chunk(data.results, 20)[page];
          state.length = _.chunk(data.results, 20).length;
        });
    },

    PAGINATION({ state }, page) {
      state.data = state.currentData[page - 1];
    },

    SEARCH_REQUEST({ state }, phrase) {
      const res = state.allData.filter(user => user.email.toLowerCase().includes(phrase.toLowerCase())
                                            || user.phone.toLowerCase().includes(phrase.toLowerCase())
                                            || user.gender.toLowerCase().includes(phrase.toLowerCase())
                                            || user.name.first.toLowerCase().includes(phrase.toLowerCase())
                                            || user.name.last.toLowerCase().includes(phrase.toLowerCase())
                                      )
      state.currentData = _.chunk(res, 20);
      state.data = _.chunk(res, 20)[0];
      state.length = _.chunk(res, 20).length;
    }
  }
};