import React from "react";

const InfoForm = () => {
	return (
		<section className='border border-black p-4 rounded-2xl'>
			<p className='text-center mb-6'>Enter Player Details</p>
			<form>
				<div className='divide-y divide-gray-200'>
					<div className=' text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
						<div className='relative mb-6'>
							<input
								type='text'
								name='player1'
								id='player1'
								// required
								autoComplete='off'
								// ref={emailInputRef}
								className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
								placeholder='player 1 name'
							/>

							<label
								htmlFor='player1'
								className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
							>
								Player 1 name
							</label>
						</div>
					</div>
				</div>
				<div className='divide-y divide-gray-200'>
					<div className=' text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
						<div className='relative mb-6'>
							<input
								type='text'
								name='player2'
								id='player2'
								// required
								autoComplete='off'
								// ref={emailInputRef}
								className='peer placeholder-transparent h-10 w-full border-b-2 border-black text-gray-900 focus:outline-none focus:borer-rose-600 px-4 bg-transparent focus:border-[#AF7EEB]'
								placeholder='player 2 name'
							/>

							<label
								htmlFor='player2'
								className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
							>
								Player 2 name
							</label>
						</div>
					</div>
				</div>
				<div className='flex justify-between'>
					<button className='border border-black'>cancel</button>
					<button className='bg-green-400 border border-green-400'>submit</button>
				</div>
			</form>
		</section>
	);
};

export default InfoForm;
