import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import Comments from './Comments'
import { addAllData, handleUpdatePostState } from '../redux/postSlicer'

function ChildModal(props) {
	const [postinfo, setPostInfo] = useState({
		title: '',
		body: '',
	})
	const dispatch = useDispatch()
	const handleChange = (e) => {
		setPostInfo({
			...postinfo,
			[e.target.name]: e.target.value,
		})
	}

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	}

	return (
		<React.Fragment>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
				sx={{ backgroundColor: 'transparent' }}
			>
				<Box sx={{ ...style, width: 500 }}>
					<h2 id="child-modal-title">Edit</h2>
					<TextField
						label="Post Title"
						variant="outlined"
						style={{ marginBottom: 8 }}
						fullWidth
						color="secondary"
						name="title"
						onChange={(e) => handleChange(e)}
					/>
					<TextField
						label="Post Content"
						variant="outlined"
						style={{ marginBottom: 8 }}
						fullWidth
						multiline
						color="secondary"
						onChange={(e) => handleChange(e)}
						name="body"
					/>
					<Button
						onClick={() =>
							dispatch(
								handleUpdatePostState({
									userIndex: props.userIndex,
									postIndex: props.postIndex,
									postName: postinfo.title,
									postContent: postinfo.body,
								})
							)
						}
					>
						Update
					</Button>
				</Box>
			</Modal>
		</React.Fragment>
	)
}

function UpdatedModal(props) {
	const [comments, setComments] = useState([])
	const [comment, setComment] = useState({
		name: '',
		email: '',
		body: '',
		postId: 0,
		id: 0,
	})
	const dispatch = useDispatch()

	useEffect(() => {
		const allData = JSON.parse(localStorage.getItem('usersData'))
		let updatedPosts = [...allData]
		const postPostion = updatedPosts[props?.userIndex - 1].posts.findIndex(
			(item) => item?.id === props?.postIndex
		)
		const post = updatedPosts[props?.userIndex - 1].posts[postPostion]

		try {
			if (Object.keys(post).includes('comments')) {
				setComments([
					...updatedPosts[props.userIndex - 1].posts[postPostion]
						.comments,
				])
				localStorage.setItem('usersData', JSON.stringify(updatedPosts))
			} else {
				if (postPostion === -1) {
					return
				}
				axios
					.get(
						'https://jsonplaceholder.typicode.com/comments?postId=' +
							props.postIndex
					)
					.then((result) => {
						updatedPosts[props.userIndex - 1].posts[
							postPostion
						].comments = [...result.data]
						setComments([...result.data])
						localStorage.setItem(
							'usersData',
							JSON.stringify(updatedPosts)
						)
					})
					.catch((error) => {
						alert(error)
					})
			}
		} catch {
			return
		}
		return () => {
			setComments([])
		}
	}, [props])

	const handleChange = (e) => {
		setComment({
			...comment,
			[e.target.name]: e.target.value,
		})
	}

	const handleAddComment = () => {
		try {
			let updatedPosts = [
				...JSON.parse(localStorage.getItem('usersData')),
			]
			const postPostion = updatedPosts[
				props?.userIndex - 1
			].posts.findIndex((item) => item?.id === props?.postIndex)
			const post = updatedPosts[props?.userIndex - 1].posts[postPostion]
			if (post.comments.length === 0) {
				const newComment = {
					name: updatedPosts[props?.activeIndex - 1].name,
					email: updatedPosts[props?.activeIndex - 1].email,
					body: comment?.body,
					postId: props?.postIndex,
					id: 0,
				}
				updatedPosts[props?.userIndex - 1].posts[postPostion].comments =
					[
						newComment,
						...updatedPosts[props?.userIndex - 1].posts[postPostion]
							.comments,
					]
				setComments([
					...updatedPosts[props?.userIndex - 1].posts[postPostion]
						.comments,
				])
				localStorage.setItem('usersData', JSON.stringify(updatedPosts))
				dispatch(addAllData(updatedPosts))
				alert('Comment Added')

				return
			} else {
				const commentId =
					post.comments[post?.comments?.length - 1].id + 1
				const newComment = {
					name: updatedPosts[props?.activeIndex - 1].name,
					email: updatedPosts[props?.activeIndex - 1].email,
					body: comment?.body,
					postId: props?.postIndex,
					id: commentId,
				}
				updatedPosts[props?.userIndex - 1].posts[postPostion].comments =
					[
						newComment,
						...updatedPosts[props?.userIndex - 1].posts[postPostion]
							.comments,
					]
				setComments([
					...updatedPosts[props?.userIndex - 1].posts[postPostion]
						.comments,
				])
				localStorage.setItem('usersData', JSON.stringify(updatedPosts))
				dispatch(addAllData(updatedPosts))
				alert('Comment Added')
			}
		} catch (error) {
			alert(error)
		}
	}

	const Updatedstyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	}

	return (
		<React.Fragment>
			<Modal
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
				sx={{ backgroundColor: 'transparent' }}
			>
				<Box
					sx={{
						...Updatedstyle,
						width: 500,
						overflowY: 'scroll',
						height: '300px',
						borderRadius: '8px',
						backgroundColor: '#fff',
						boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
					}}
				>
					<h2
						id="child-modal-title"
						style={{
							fontSize: '28px',
							marginBottom: '16px',
							marginTop: '8px',
							textAlign: 'center',
							background:
								'linear-gradient(to right, #FFD700, #FFA500)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						Comments
					</h2>
					<TextField
						label="Enter any Comment"
						variant="outlined"
						style={{ marginBottom: '16px' }}
						fullWidth
						color="secondary"
						name="body"
						onChange={handleChange}
					/>
					<Button
						onClick={handleAddComment}
						variant="contained"
						color="primary"
						style={{ marginBottom: '16px' }}
					>
						Add
					</Button>
					{comments?.length > 0 ? (
						comments?.map((comment, index) => (
							<Comments
								key={index}
								title={comment.name}
								body={comment.body}
							/>
						))
					) : (
						<CircularProgress />
					)}
				</Box>
			</Modal>
		</React.Fragment>
	)
}

export { ChildModal, UpdatedModal }
