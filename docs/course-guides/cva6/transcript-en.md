# CVA6: Capabilities, Systems and Evidence

## 1. Evaluate a CVA6 choice

Suppose your team is choosing a processor for an embedded controller or a Linux host. Someone says, “CVA6 supports it.” What would you check next? CVA6 is a configurable RISC-V processor family. Its name alone does not select the instruction set features, memory system or maturity level of your implementation. In this guide, we will read three real configurations, follow a short execution example, and connect software and application claims to their evidence. By the end, you should be able to write a useful evaluation statement: which configuration, in which system, supported by which result.

## 2. Follow instructions through the core

Start inside the core. The frontend obtains instructions, and decode identifies the operations. Issue checks whether operands and execution resources are available. A scoreboard tracks outstanding instructions and their results. Execution units then perform arithmetic, branches or memory accesses. Commit controls when instructions retire and their effects become architectural state, including exception handling. These boxes describe responsibilities, rather than promising a fixed number of clock cycles. Outside them, a usable system still needs memory, interconnect, interrupts, debug and boot software. Keeping that boundary visible helps you decide whether a question belongs in the core configuration or in the surrounding platform.

## 3. Compare three concrete configurations

Select each configuration and compare the values. In this source snapshot, both 32-bit examples disable the memory management unit, supervisor and user modes, atomics and floating point. Their issue widths differ: CV32A60X has one issue port, while CV32A65X has two. The 64-bit example enables the listed application-oriented facilities. Notice that commit width is a separate value. The configuration builder can override a raw package field: it gives the superscalar example two commit ports. Always read the selected package together with derived configuration logic. These are source-level capability limits; actual instruction throughput still depends on the program and stalls.

## 4. Separate issue, completion and retirement

Consider a load followed by an independent addition. The load issues first, but memory may take several cycles to respond. If operands and resources are ready, the later addition can issue and return its result before the load completes. The scoreboard associates each result with its instruction. Retirement preserves program order, so a result becoming available is different from an instruction retiring. This is why ordered issue and differently ordered completion can coexist. Now apply the same care to performance: two issue ports describe available width. Dependencies, resource conflicts, branches and memory delays determine how much of that width a real workload can use.

## 5. Match the core to its software platform

For an embedded task, begin with the software port: its instruction set, calling convention, interrupt handling and board support must match your hardware. A concrete example is the ThreadX release published on June eighth, twenty twenty-six, which adds support for 32-bit CVA6. Its tag contains February, but that is not its publication date. For a Linux host, select suitable core facilities and integrate memory, boot firmware, the kernel and the device tree. The CVA6 SDK and the separately maintained Cheshire platform provide useful starting points. In either path, a software support statement becomes actionable when it names a compatible platform and version.

## 6. Ask what each verification method checks

Verification combines several jobs. Test programs exercise behavior. A testbench and a reference model help detect differences between expected and observed results. Coverage asks which planned scenarios or implementation structures were exercised, and which gaps remain. The CVA6 verification tree separates board support, simulation, tests and regression scripts, with configuration and simulator selections made explicitly. Architectural tests answer another bounded question about instruction set behavior. The ACT4 framework is useful here, but its own documentation calls for additional processor verification. This course does not claim that a particular CVA6 build passed ACT4. When reading a green result, open the run details and record exactly what ran.

## 7. Read the CV32A60X TRL5 release precisely

Here is a concrete maturity statement. The April twenty-third, twenty twenty-five release is explicitly a CV32A60X configuration release for technology readiness level five. Its scope includes an OBI interface, no caches, no physical memory protection entries, and a disabled instruction-fetch fence extension. The release also describes improvements to coverage and lint. Preserve that whole scope when citing the result. The package comparison earlier in this course uses a different source snapshot. The same configuration name on another branch does not automatically carry the release evidence forward. If you add features or change integration, identify what must be verified again. Safety certification is a separate assessment with its own required evidence.

## 8. Practice matching a claim to its evidence

Try the four evidence cards. Each gives you a reported result and two possible conclusions. Choose the conclusion that keeps the useful information while preserving its scope. An architectural test pass, a named maturity release, Linux running on silicon, and a safety argument answer different questions. One cannot silently replace another. In particular, adding a safety mechanism or using an operating system with certification material does not automatically certify a new processor or system. Read the feedback after each choice. When a claim seems too broad, ask for the missing target, version, environment or assessment, rather than discarding the evidence that is actually available.

## 9. See CVA6 in four different system roles

Four examples show different roles. The TRISTAN project describes a Bosch industrial radar and artificial intelligence demonstration using customized CVA6 and acceleration, while future integration and certification remain exploratory. Thales presented ASTRAL as an experimental, space-oriented system with multiple CVA6 cores, OpenTitan and vector acceleration. Basilisk provides a different kind of evidence: a Linux-capable CVA6 and Cheshire system, made with an open design flow on a one-hundred-thirty-nanometer process, with silicon measurements. In Occamy, CVA6 is the Linux-capable manager; the many-core compute accelerator uses Snitch clusters. For each case, carry both the processor’s role and the demonstrated stage into your evaluation.

## 10. Turn the evidence into an evaluation record

Turn your reading into a short evaluation record. Name the configuration and commit, then record the derived parameters that matter to your workload. Add the platform, software versions and relevant test results. State the gaps, and choose one next experiment that would change your decision. For example, a controller project might first check interrupt behavior on its board; a Linux host might first establish a reproducible boot. Keep roadmap information dated. The July fifteenth, twenty twenty-six roadmap discusses CV64A60AX verification and dual-core lockstep integration work. Those entries help identify active engineering work, while completed capabilities still need release or implementation evidence.

## 11. Make four engineering decisions

Now apply the guide to four decisions. Choose the statement you could defend from the supplied evidence. Read each explanation, including when your first answer is correct. The questions cover width versus performance, the scope of a maturity release, transfer of system evidence, and the role of a processor in a larger chip. You do not need to memorize every parameter. You do need to know what to inspect before making a claim. If an answer is unclear, return to the configuration or evidence explorer, then try again. Your final task will use the same reasoning on the source files themselves.

## 12. Your first source-based evaluation

Open the CV32A65X package from the source panel. Find the superscalar flag and the raw commit-port field. Then open the configuration builder and follow how it derives both widths. Write the effective values alongside the commit identifier. Add one statement about the system you want to build, and one piece of evidence you still need. You now have a small, reproducible engineering record. Continue into verification, platform software or application sources according to that missing result. The habit to keep is simple: a useful capability claim names a configuration, a system boundary and evidence that another person can inspect.
