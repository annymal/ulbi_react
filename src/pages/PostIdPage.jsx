import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../components/hooks/useFetching';

const PostIdPage = () => {
	const params = useParams()
	const [post, setPost] = useState({})
	const [comments, setComments] = useState([])

	//отправка запроса 
	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id)
		setPost(response.data)
	})

	const [fetchСomments, isComLoading, comError] = useFetching(async (id) => {
		const response = await PostService.getCommentsById(id)
		setComments(response.data)
	})

	useEffect(() => {
		fetchPostById(params.id)
		fetchСomments(params.id)
	}, [])

	return (
		<div>
			<h1>posts c id ={params.id}</h1>
			{isLoading ?
				<Loader />
				: <div>
					{post.id} {post.title}
				</div>
			}
			<h1>
				Комментарии
			</h1>
			{isComLoading ?
				<Loader />
				: <div>
					{comments.map(comm =>
						<div key={comm.id} style={{ marginTop: 15 }}>
							<h5>{comm.email}</h5>
							<div>{comm.body}</div>
						</div>
					)}
				</div>}
		</div>
	)
}

export default PostIdPage