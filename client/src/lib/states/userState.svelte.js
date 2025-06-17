
let user = $state({});

const useUserState = () => {
  return {
    get user() {
      return user;
    },
    set user(u) {
      user = u;
    },
    clear: () => {
      user = {}
    },
  };
};

export { useUserState };