export default function NewGameForm() {
	return (
		<div>
			<h1 className='text-xl font-medium'>New Game</h1>
			<form action=''>
				<div className='border flex flex-col justify-center items-start'>
					<label htmlFor='player_1'>
						<p className='text-xs m-1'>Player 1 name:</p>
					</label>
					<input
						type='text'
						placeholder='Player 1 name'
						className='border border-black rounded-md px-2 focus:border-blue-600 w-full'
					/>
				</div>
			</form>
		</div>
	)
}
