; select all text in textfield and change matchtypes
;
; WIN + numpad minus --> exact match
; WIN + numpad plus  --> broad match modifier

#NumPadSub::
   Send ^a
   Send ^c
   StringReplace, clipboard, clipboard, `r`n, ]`r`n[, All
   Send, [
   Send ^v
   Send, ]
Return

#NumPadAdd::
   Send ^a
   Send ^c
   StringReplace, clipboard, clipboard, `r`n, `r`n+, All
   StringReplace, clipboard, clipboard, %A_SPACE%, %A_SPACE%+, All
   Send {+}
   Send ^v
Return
