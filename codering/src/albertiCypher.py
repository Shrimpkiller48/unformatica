

class Formula:
    def __init__(self,stabilis,mobilis):
        assert self.isvalidformula(stabilis, mobilis) == True, "invalid wheel"
        self.originalsta=stabilis
        self.originalmo=mobilis
        self.stabilis=stabilis
        self.mobilis=mobilis

    def isvalidformula(self,stabilis,mobilis):
        if len(stabilis)!=len(mobilis):
            return False
        both=str(mobilis)+str(stabilis)
        for letter in both:
            if mobilis.count(letter)>1 or stabilis.count(letter)>1:
                return False
        return True

    def __repr__(self):
        return f"Formula('{self.stabilis}', '{self.mobilis}')"

    def __str__(self):
        return f"stabilis: {self.stabilis}\nmobilis:  {self.mobilis}"

    def reset(self):
        self.stabilis=self.originalsta
        self.mobilis=self.originalmo
        return Formula(self.stabilis,self.mobilis)

    def rotate(self,r):
        assert type(r)==int,"invalid rotation"
        if r>0:
            for i in range(r):
                self.mobilis=self.mobilis[1:]+self.mobilis[0]
        if r<0:
            for i in range(abs(r)):
                self.mobilis=self.mobilis[-1]+self.mobilis[:-1]
        return Formula(self.stabilis,self.mobilis)

    def encode_symbol(self,s):
        assert self.isvalidsymbol(s) == True, "invalid symbol"
        return self.mobilis[self.stabilis.find(s)]

    def isvalidsymbol(self,r,stabilis=True):
        if stabilis:
            if r not in self.stabilis:
                return False
        else:
            if r not in self.mobilis:
                return False
        return True

    def decode_symbol(self,s):
        assert self.isvalidsymbol(s,stabilis=False),"invalid symbol"
        return self.stabilis[self.mobilis.find(s)]

    def encode(self,plain,inro,pero,per):
        for letter in plain:
            assert self.isvalidsymbol(letter),"invalid symbol"
        resul=""
        self.reset()
        self.rotate(inro)
        for i,letter in enumerate(plain):
            if i%per==0 and i!=0:
                self.rotate(pero)
            resul+=self.encode_symbol(letter)
        return resul

    def decode(self,plain,inro,pero,per):
        for letter in plain:
            assert self.isvalidsymbol(letter,stabilis=False),"invalid symbol"
        resul=""
        self.reset()
        self.rotate(inro)
        for i,letter in enumerate(plain):
            if i%per==0 and i!=0:
                self.rotate(pero)
            resul+=self.decode_symbol(letter)
        return resul

    def __add__(self, other):
        if not other:
            return Formula(self.stabilis, self.mobilis)
        return Formula(self.stabilis,self.mobilis).rotate(other)

    def __radd__(self, other):
        if not other:
            return Formula(self.stabilis, self.mobilis)
        return Formula(self.stabilis, self.mobilis).rotate(other)



    def __sub__(self, other):
        if not other:
            return Formula(self.stabilis, self.mobilis)
        result = Formula(self.stabilis, self.mobilis)
        assert isinstance(other,int)==True, "invalid rotation"
        result.rotate(-other)
        return result

    def __rsub__(self, other):
        if not other:
            return Formula(self.stabilis, self.mobilis)
        result = Formula(self.stabilis, self.mobilis)
        assert isinstance(other, int) == True, "invalid rotation"
        result.rotate(-other)
        return result



wheel_01 = Formula('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')
import sys
if sys.argv[2] == "codeer":
    print(wheel_01.encode(sys.argv[1],6,6,6))
else:
    print(wheel_01.decode(sys.argv[1],6,6,6))

