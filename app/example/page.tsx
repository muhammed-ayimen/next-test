'use client';

import {
  GetCategoryDocument,
  GetHomeScreensDocument,
  GetOriginalVideoDocument,
  GetVideoCommentsDocument,
} from '@/lib/graphql/generated/graphql';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';

const firstCategoryId = '2';

const Page: NextPage = () => {
  const { data: homeScreenData } = useQuery(GetHomeScreensDocument);
  const firstCategoryIdFromHome =
    homeScreenData?.homeScreens?.[0]?.category?.id ?? firstCategoryId;
  const { data: homeCategoryData } = useQuery(GetCategoryDocument, {
    variables: { id: firstCategoryIdFromHome },
    skip: !homeScreenData,
  });
  const { data: VideoData } = useQuery(GetOriginalVideoDocument, {
    variables: { id: '1480' },
  });
  const { data: videoCommentsData, fetchMore } = useQuery(
    GetVideoCommentsDocument,
    {
      variables: { id: '1480', first: 5 },
    },
  );
  const { data: categoryData } = useQuery(GetCategoryDocument, {
    variables: { id: '2' },
  });

  if (
    !homeScreenData ||
    !homeCategoryData ||
    !VideoData ||
    !videoCommentsData ||
    !categoryData
  )
    return <div>Loading...</div>;

  const firstScreen = homeScreenData.homeScreens[0];
  const homeVideos = homeCategoryData?.category?.videos ?? [];

  return (
    <div className="flex gap-4">
      <div>
        <h2>Home Screen</h2>
        {firstScreen.category?.name}
        {homeVideos.map((video) => (
          <div key={video.id}>
            <div>{video.title}</div>
          </div>
        ))}
      </div>
      <div>
        <h2>Video</h2>
        <div>{VideoData.originalVideo?.title}</div>
      </div>
      <div>
        <h2>Comments</h2>
        {videoCommentsData.videoComments.edges?.map(({ node }) =>
          node ? (
            <div key={node.id}>
              <div>{node.contents}</div>
            </div>
          ) : null,
        )}
        <button
          onClick={() =>
            fetchMore({
              variables: {
                after: videoCommentsData.videoComments.pageInfo?.endCursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                return {
                  videoComments: {
                    ...prev.videoComments,
                    edges: [
                      ...(prev.videoComments.edges || []),
                      ...(fetchMoreResult.videoComments.edges || []),
                    ],
                    pageInfo: fetchMoreResult.videoComments.pageInfo,
                  },
                };
              },
            })
          }
        >
          Load More
        </button>
      </div>
      <div>
        <h2>Category</h2>
        {categoryData.category.name}
        {categoryData.category.videos?.map((video) => (
          <div key={video.id}>
            <div>{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
