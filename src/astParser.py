import ast
import os
import time
import sys

func = 0
count = 0
maxDepth = 0
depth = 0
pathEnd = False
varMod = True

nodes = {}
edges = {}
loopEdges = {}
pathEdges = {0: 1}
exitEdges = {}
vars = {}
varMap = [{}]
scope = 0

conds = {}
lines = {}



class Visitor(ast.NodeVisitor):
      
      def condPrint(self, node: ast.AST):
        if isinstance(node, ast.BoolOp):
            result = self.condPrint(node.values[0])
            for val in node.values[1:]:
                result += self.boolStr(node.op) + self.condPrint(val)
            return result
        elif isinstance(node, ast.BinOp):
            if isinstance(node.op, ast.Mod):
                return self.condPrint(node.left) + "%" + self.condPrint(node.right)
            return self.condPrint(node.left) + str(node.op) + self.condPrint(node.right)
        elif isinstance(node, ast.Compare):
            result = self.condPrint(node.left) + " "
            for op, right in zip(node.ops, node.comparators):
                result += self.compStr(op) + " " + self.condPrint(right)
            return result
        elif isinstance(node, ast.UnaryOp):
            return self.condPrint(node.left) + str(node.op) + self.condPrint(node.right)
        elif isinstance(node, ast.Name):
            #print(node.id)
            return str(node.id)
        elif isinstance(node, ast.Constant):
            return str(node.value)
        return ""

      def boolStr(self, node: ast.AST):
          if isinstance(node, ast.And):
              return " and "
          else:
              return "or"
              
              

      def compStr(self, node: ast.AST):
          if isinstance(node, ast.NotEq):
              return "!="
          elif isinstance(node, ast.Eq):
              return "=="
          elif isinstance(node, ast.Lt):
              return "<"
          elif isinstance(node, ast.Gt):
              return ">"
          elif isinstance(node, ast.LtE):
              return "<="
          elif isinstance(node, ast.GtE):
              return ">="

      def calc(self, node: ast.AST):
        if isinstance(node, ast.BoolOp):
            return self.calc_boolop(node)
        elif isinstance(node, ast.BinOp):
            return self.calc_binop(node)
        elif isinstance(node, ast.Compare):
            return self.calc_compare(node)
        elif isinstance(node, ast.UnaryOp):
            return self.calc_unaryop(node)
        elif isinstance(node, ast.Name):
            #return findVar(scope, node.id) #varMap[scope][node.id]
            return vars[node.id]
        elif isinstance(node, ast.Constant):
            return node.value
        


      def calc_boolop(self, node: ast.BoolOp):
        if isinstance(node.op, ast.And):
            return all(self.calc(value) for value in node.values)
        elif isinstance(node.op, ast.Or):
            return any(self.calc(value) for value in node.values)
        else:
            raise NotImplementedError("Unsupported BoolOp")


      def calc_binop(self, node: ast.BinOp):
        left_value = self.calc(node.left)
        right_value = self.calc(node.right)

        if isinstance(node.op, ast.Add):
            return left_value + right_value
        elif isinstance(node.op, ast.Sub):
            return left_value - right_value
        elif isinstance(node.op, ast.Mult):
            return left_value * right_value
        elif isinstance(node.op, ast.Div):
            return left_value / right_value
        elif isinstance(node.op, ast.Mod):
            return left_value % right_value
        else:
            raise NotImplementedError("Unsupported BinOp")


      def calc_compare(self, node: ast.Compare):
        left_value = self.calc(node.left)
        comparators = [self.calc(comp) for comp in node.comparators]

        for op, right_value in zip(node.ops, comparators):
            if isinstance(op, ast.NotEq):
                if left_value != right_value:
                    return True
            elif isinstance(op, ast.Eq):
                if left_value == right_value:
                    return True
            elif isinstance(op, ast.Lt):
                if left_value < right_value:
                    return True
            elif isinstance(op, ast.Gt):
                if left_value > right_value:
                    return True
            elif isinstance(op, ast.LtE):
                if left_value <= right_value:
                    return True
            elif isinstance(op, ast.GtE):
                if left_value >= right_value:
                    return True
        return False


      def calc_unaryop(self, node: ast.UnaryOp):
        operand_value = self.calc(node.operand)

        if isinstance(node.op, ast.UAdd):
            return +operand_value
        elif isinstance(node.op, ast.USub):
            return -operand_value
        else:
            raise NotImplementedError("Unsupported UnaryOp")
          



      def visit(self, node: ast.AST):
            global func
            global depth
            global maxDepth
            global pathEnd
            global scope
            global varMod
            if depth >= maxDepth:
                return
            if isinstance(node, ast.Module):
                 self.generic_visit(node)
            if isinstance(node, ast.FunctionDef):
                if func == 0: #f node.name == "main":
                    newNode("Function:")
                    lines[1] = node.lineno
                    for a in node.args.args:
                        vars[a.arg] = 0
                    func = 1
                    self.generic_visit(node)
                else:
                    func = 1
            if (func == 1):
                curr = None
                prev = max(nodes.keys())
                #lines[prev] = node.lineno
                if isinstance(node, ast.stmt):
                    #print(node.__class__)
                    if (nodes[prev] == "Exit If" or nodes[prev] == "Exit Loop") and not(prev in lines):
                        lines[prev] = node.lineno
                    if isinstance(node, ast.Assign):
                        if varMod:
                            for target in node.targets:
                                vars[target.id] = self.calc(node.value)
                                #varMap[scope][target.id] = self.calc(node.value)
                                #vars[prev][target.id] = self.calc(node.value, vars[prev])

                    if isinstance(node, ast.If):
                        depth += 1
                        if depth >= maxDepth:
                            curr = newNode("Nested If")
                            newEdge(prev, [curr])
                            newPathEdge(prev, curr)
                            exit = newNode("Exit If")
                            newEdge(curr, [exit])
                            newPathEdge(curr, exit)
                            depth -= 1
                            return
                        curr = newNode("If Condition")
                        lines[curr] = node.test.lineno
                        newEdge(prev, [curr])
                        newPathEdge(prev, curr)
                        cond = self.calc(node.test)
                        conds[curr] = self.condPrint(node.test)
                        body = newNode("Then")
                        #varMap.append({})
                        #scope += 1
                        lines[body] = node.body[0].lineno
                        if (cond):
                            newPathEdge(curr, body)
                        else:
                            varMod = False
                        newEdge(curr, [body])
                        for n in node.body:
                            self.visit(n)
                        thenEnd = max(nodes.keys())
                        #varMap.pop()
                        #scope -= 1
                        varMod = True
                        elseBody = -1
                        elseEnd = -1
                        if len(node.orelse) > 0:
                            elseBody = newNode("Else")
                            #varMap.append({})
                            #scope += 1
                            lines[elseBody] = node.orelse[0].lineno
                            if not(cond):
                                newPathEdge(curr, elseBody)
                            else:
                                varMod = False
                            newEdge(curr, [elseBody])
                            for n in node.orelse:
                                self.visit(n)
                            elseEnd = max(nodes.keys())
                            varMod = True
                            #varMap.pop()
                            #scope -= 1
                        if nodes[thenEnd] == "Return" and (elseEnd > 0) and (nodes[elseEnd] == "Return"):
                            pathEnd = True
                            print("unreachable code")
                            return
                        if nodes[thenEnd] == "Return" and cond:
                            pathEnd = True
                        if (elseEnd > 0) and (nodes[elseEnd] == "Return") and not(cond):
                            pathEnd = True
                        exit = newNode("Exit If")
                        if (cond):
                            newPathEdge(thenEnd, exit)
                        elif elseBody != -1:
                            newPathEdge(elseEnd, exit)
                        else:
                            newPathEdge(curr, exit)
                        newEdge(thenEnd, [exit])
                        if len(node.orelse) > 0:
                            newEdge(elseEnd, [exit])
                        else: 
                            newEdge(curr, [exit])
                        depth -= 1

                    elif isinstance(node, ast.While) or isinstance(node, ast.For):
                        depth += 1
                        if depth >= maxDepth:
                            curr = newNode("Nested Loop")
                            newEdge(prev, [curr])
                            newPathEdge(prev, curr)
                            exit = newNode("Exit Loop")
                            newEdge(curr, [exit])
                            newPathEdge(curr, exit)
                            depth -= 1
                            return
                        curr = newNode("Loop Condition")
                        lines[curr] = node.test.lineno
                        newEdge(prev, [curr])
                        newPathEdge(prev, curr)
                        cond = self.calc(node.test)
                        conds[curr] = self.condPrint(node.test)
                        body = newNode("Body")
                        lines[body] = node.body[0].lineno
                        newEdge(curr, [body])
                        #varMap.append({})
                        #scope += 1
                        if cond:
                            newPathEdge(curr, body)
                        else:
                            varMod = False
                        for n in node.body:
                            self.visit(n)
                        whileEnd = max(nodes.keys())
                        varMod = True
                        #varMap.pop()
                        #scope -= 1
                        exit = newNode("Exit Loop")
                        newEdge(whileEnd, [exit])
                        exitEdges[whileEnd] = exit
                        if not(cond):
                            newPathEdge(curr, exit)

                        newPathEdge(whileEnd, exit)
                        #newPathEdge(whileEnd, curr)
                        newEdge(curr, [exit])
                        newLoopEdge(whileEnd, [curr]) 
                        depth -= 1
                    elif isinstance(node, ast.Return):
                        curr = newNode("Return")
                        lines[curr] = node.lineno
                        newEdge(prev, [curr])
                        newPathEdge(prev, curr)

                elif isinstance(node, ast.Call):
                    curr = newNode("Function Call")
                    newEdge(prev, [curr])
                    newPathEdge(prev, curr)
      

def findVar(sc, id):
    while sc >= 0:
        if id in varMap[sc].keys():
            return varMap[sc][id]
        sc -= 1

def newNode(name):
      global count
      count += 1
      nodes[count] = name
      return count

def newEdge(src, dests):
     if nodes[src] != "Return":
        if src in edges:
            edges[src] = edges[src] + dests
        else:
            edges[src] = dests

def newLoopEdge(src, dests):
    if src in loopEdges:
        loopEdges[src] = loopEdges[src] + dests
    else:
        loopEdges[src] = dests

def newPathEdge(src, dests):
    if not(pathEnd) and (src in pathEdges.values()):      # or src in exitEdges.values():
        pathEdges[src] = dests


    
def writeDot(outFile, src, des):
    outFile = open("outfile.dot", "w")
    outFile.write("digraph G {\nsplines=true\nNode [shape=rectangle, style=rounded, fixedsize=false, height=1.3, width=1.7]\n")
    outFile.write("nodesep=1;\n")
    for node in nodes.keys():
        name = nodes[node]
        if not(name != "Function:" and node not in [item for sublist in edges.values() for item in sublist]):
            #print(nodes[node])
            if src == node:
                if (name == "Function:"):
                    outFile.write(f"{node} [height=1, label=\"" + name + "\", color=\"gold\"]\n")
                elif (node in conds):
                    outFile.write(f"{node} [height=1, label=\"" + name + ":\n" + str(conds[node]) + "\", color=\"gold\"]\n")
                else:
                    outFile.write(f"{node} [label=\"" + name + "\", color=\"gold\"]\n")
            else:
                if (name == "Function:"):
                    outFile.write(f"{node} [height=1, label=\"" + name + "\"]\n")
                if (name == "Nested Loop") or (name == "Nested If"):
                    outFile.write(f"{node} [label=\"" + name + "\", color=\"grey\"]\n")
                elif (node in conds):
                    outFile.write(f"{node} [height=1, label=\"" + name + ":\n" + str(conds[node]) + "\"]\n")
                else:
                    outFile.write(f"{node} [label=\"" + name + "\"]\n")
    for edge in edges.keys(): 
        if nodes[edge] != 'Return':
            dests = edges[edge]
            dl = len(dests)
            for dest in dests:
                if src == edge and des == dest:
                    if (dl == 2):
                        outFile.write(f"{edge} -> {dest} [label=\"True\", color=\"gold\"]\n")
                        dl += 1
                    elif (dl == 3):
                        outFile.write(f"{edge} -> {dest} [label=\"False\", color=\"gold\"]\n")
                    else:
                        outFile.write(f"{edge} -> {dest} [color=\"gold\"]\n")
                else:
                    if edge in exitEdges and dest == exitEdges[edge]:
                        outFile.write(f"{edge} -> {dest} [color=\"white\"]\n")
                    elif (dl == 2):
                        outFile.write(f"{edge} -> {dest} [label=\"True\", color=\"blue\"]\n")
                        dl += 1
                    elif (dl == 3):
                        outFile.write(f"{edge} -> {dest} [label=\"False\", color=\"red\"]\n")
                    else:
                        outFile.write(f"{edge} -> {dest}\n")
    for edge in loopEdges.keys():
        dests = loopEdges[edge]
        for dest in dests:
            if src == edge and des == dest:
                outFile.write(f"{edge} -> {dest} [color=\"gold\"]\n")
            else:
                outFile.write(f"{edge} -> {dest} []\n") #constraint=\"false\"
    outFile.write("}")



def main():
    global maxDepth
    global pathEdges
    runC = sys.argv[1]
    maxDepth = int(sys.argv[2])
    with open("program.py") as inFile:
        program = inFile.read()
    
    head = ast.parse(program)
    Visitor().visit(head)
    #print(lines)
    #print(nodes)
    #print(edges)
    #for node in nodes.keys():
    #    if (nodes[node] != "Main:" and node not in [item for sublist in edges.values() for item in sublist]):
    #        return
    
    outFile = open("outfile.dot", "w")
    writeDot(outFile, -5, -5)
    os.system('./run_dot.sh')
    outFile.close()

    if (runC == "cfg"):
        print(0)
        return
    
    #pathEdges.pop(0)
    pathList = list(pathEdges.keys())
    step = -1
    if (runC.isdigit()):
        step = int(runC)
        if step >= len(pathList):
            outFile = open("outfile.dot", "w")
            writeDot(outFile, pathEdges[pathList[len(pathList) - 1]], -1)
            os.system('./run_dot.sh')
            #print("last call, block num: " + str(pathEdges[pathList[len(pathList) - 1]]))
            
            last = edges[pathList[len(pathList) -1]][0]
            if (last) and (last in lines):
                print(lines[last])
            else:
                #print(pathList)
                #print(lines)
                print(0)
            return
        curr = pathList[step]
        next = pathEdges[curr]
        if curr in loopEdges.keys():
            next = loopEdges[curr][0]
            #print(next)   -----------------
        outFile = open("outfile.dot", "w")
        writeDot(outFile, curr, next)
        os.system('./run_dot.sh')
        if (curr in lines):
            print(lines[curr])
        return

    pathEdges.pop(0)
    pathList = list(pathEdges.keys())

    index = 0
    last = 1
    once = True
    if runC != "run":
        return
    while (index < len(pathList)):
        src = pathList[index]
        des = pathEdges[src]
        last = des
        if src in loopEdges.keys() and once:
            des = loopEdges[src][0]
            #index = pathList.index(des) - 1
            once = False
            time.sleep(0.5)
            outFile = open("outfile.dot", "w")
            writeDot(outFile, src, des)
            os.system('./run_dot.sh')
            src = des
            des = last
            last = des

        time.sleep(0.5)
        outFile = open("outfile.dot", "w")
        writeDot(outFile, src, des)
        os.system('./run_dot.sh')
            
        index += 1
        outFile.close()


    outFile = open("outfile.dot", "w")
    writeDot(outFile, last, -1)
    os.system('./run_dot.sh')
    if (last in lines):
        print(lines[last])
    return


if __name__ == "__main__":
         main()

