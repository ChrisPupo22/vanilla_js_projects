class GitHub {
  constructor() {
    this.client_id = "b1694ac93d17740eb0e6";
    this.client_secret = "f00cac2b5439e608504583521e50d16da3078b61";
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profileData = await profileResponse.json(); 
    
    return {
        profile: profileData
    }
  }
}
