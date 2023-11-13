import {useCallback} from 'react';
import Button from '../../../components/elements/Button';
import groq from 'groq';

export default function BlogListingClient({children}) {
    let lastId = '';

    const fetchNextPage = useCallback(
        async () => {
        if (lastId === null) {
        return []
        }
        const {result} = await fetch(
        groq`*[_type == "post" && _id > $lastId] | order(_id) [0...50] {
            _id, title, body
        }`, {lastId});
        
        if (result.length > 0) {
        lastId = result[result.length - 1]._id;
        } else {
        lastId = null; // Reached the end
        }
        return result;
    });

    return (
      <>
        {children}
        <Button onClick={fetchNextPage}>
            Fetch more posts
        </Button>
      </>
    );
  }