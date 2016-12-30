; exact to negative exact in broad adgroup

#NumPad4::
   exact_adgr := "/1"
   broad_adgr := "/3"
   Send ^a
   Send ^c
   Send {ctrl down}{shift down}i{shift up}{ctrl up}
   Sleep 100
   StringReplace, clipboard, clipboard, %exact_adgr%, %broad_adgr%, All
   StringReplace, clipboard, clipboard, exact, negative exact, All
   Send ^v
Return
