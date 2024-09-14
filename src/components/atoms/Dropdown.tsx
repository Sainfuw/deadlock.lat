import { Globe } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Globe className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem> Español </DropdownMenuItem>
        <DropdownMenuItem> English </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
