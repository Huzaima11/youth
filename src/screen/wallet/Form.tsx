import { Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui'
import { Label } from '@/components/ui/label'

const Form = () => {
    return (
        <>
            <div className="grid gap-3">
                <Label htmlFor="amount">Amount *</Label>
                <Input id="amount" name="amount" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="payment">Payment Method</Label>
                <Select>
                    <SelectTrigger >
                        <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Payment Method</SelectLabel>
                            <SelectItem value="jaxxcash">Jazzcash</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}

export default Form
