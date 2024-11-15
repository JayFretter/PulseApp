import { Profile } from "../Models/Profile";

export function useGetProfile() {
  const getProfile = async (username: string): Promise<Profile | null> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/profile/${username}`;
    const options = {
      method: "GET",
    };

    let profile: Profile | null = null;

    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => (profile = data))
      .catch((err) => console.error(err));

    return profile;
  };

  return getProfile;
}
