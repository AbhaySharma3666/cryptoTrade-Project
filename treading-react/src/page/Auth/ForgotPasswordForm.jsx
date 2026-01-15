import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui'
import { useForm } from 'react-hook-form'

function ForgotPasswordForm() {
    const form = useForm({
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className='w-full'>
          <h1 className='text-xl font-bold text-center mb-4 text-white'>Forgot Password</h1>
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
                    
                    
                    <Button type='submit' className='w-full py-3'>
                        Send Reset Link
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ForgotPasswordForm