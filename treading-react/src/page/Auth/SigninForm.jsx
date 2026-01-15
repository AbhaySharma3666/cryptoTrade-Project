import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui'
import { useForm } from 'react-hook-form'
import { login } from '../../State/Auth/Action'

function SigninForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data) => {
        dispatch(login({data, navigate}));
        console.log(data)
    }

    return (
        <div className='w-full'>
          <h1 className='text-xl font-bold text-center mb-4 text-white'>Login</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="email"
                                        className='w-full p-3 text-white bg-transparent border border-gray-600'
                                        placeholder="Email" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="password"
                                        className='w-full p-3 text-white bg-transparent border border-gray-600'
                                        placeholder="Password" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button type='submit' className='w-full py-3'>
                        Sign In
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SigninForm