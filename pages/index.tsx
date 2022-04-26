import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'

type MyProps = {
    data:any
}

export const getStaticProps = async () => {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=20"
    ).then((response) => response.json());
    return {
      props: { data }
    };
};

const Blog = (props:MyProps) => {
    const [blogs,setBlogs] = useState(props.data)
    const [dataCount,setDataCount] = useState(props.data.length)
    const fetchData = async () =>{
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos?_start=${blogs.length}&_limit=10`
        );
        setDataCount(dataCount+10)
        const newBlogs = await res.json();
        setBlogs((blog:any) => [...blog, ...newBlogs]);
    }

  return (
    <div style={{width:'100%'}}>
        <InfiniteScroll
            dataLength={blogs.length}
            next={fetchData}
            hasMore={dataCount < 100}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
            >
            {blogs.map((data:any,key:any) =>{
                return(
                    <div className="p-5 border flex space-x-4" key={key}>
                        <h1>{data.id}.</h1>
                        <div className="font-bold">
                            {data.title}
                        </div>
                    </div>
                )
            })}
        </InfiniteScroll>
    </div>
  )
}

export default Blog
