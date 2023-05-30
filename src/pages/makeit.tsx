import MakeItLayout from "@/Components/Layout";
import Loading from "@/Components/Loading";
import { Song } from "@/Components/Song";
import { spotifyUris, userId } from "@/lib/state";
import { supabase, SUPABASE_ANON_KEY, SUPABSE_URL } from "@/lib/supabase";
import { fetcher } from "@/lib/utils";
import { LikedSong } from "@/types/songs";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { nanoid } from "nanoid";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";

const Makeit = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [uris, setUris] = useRecoilState(spotifyUris);
  const { data, error, isLoading } = useSWR(
    "https://api.spotify.com/v1/me",
    (url) =>
      fetcher(url, {
        headers: {
          Authorization: `Bearer ${session?.provider_token}`,
        },
        method: "GET",
      })
  );
  const {
    data: likedSongs,
    error: likedSongsError,
    isLoading: likedSongsIsLoading,
  } = useSWR("https://api.spotify.com/v1/me/tracks", (url) =>
    fetcher(url, {
      headers: {
        Authorization: `Bearer ${session?.provider_token}`,
      },
      method: "GET",
    })
  );
  const [userid, setUserid] = useRecoilState(userId);

  useEffect(() => {
    if (data) {
      setUserid(data.id);
    }
  }, [data, setUserid]);
  useEffect(() => {
    const spotUris: string[] = [];
    if (likedSongs) {
      likedSongs.items.forEach((element: LikedSong) => {
        spotUris.push(element.track.uri);
      });
      setUris(spotUris);
    }
  }, [likedSongs]);

  if (isLoading && likedSongsIsLoading) return <Loading />;

  return (
    <MakeItLayout
      picture={data?.images[0].url}
      name={data?.display_name}
      token={session?.provider_token}
    >
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {likedSongs?.items?.map((likedSong: LikedSong) => (
          <Song
            key={nanoid()}
            name={likedSong.track.name}
            artist={likedSong.track.artists[0].name}
            picture={likedSong.track.album?.images[0].url}
            date={likedSong.added_at}
          />
        ))}
      </Grid>
    </MakeItLayout>
  );
};

export { Makeit as default };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context, {
    supabaseKey: SUPABASE_ANON_KEY,
    supabaseUrl: SUPABSE_URL,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.provider_token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }
  return {
    props: {
      session,
    },
  };
};
